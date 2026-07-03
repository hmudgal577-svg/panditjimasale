const { User, Order, Product, Category, Review, SiteSetting } = require('../models');
const { Op, fn, col } = require('sequelize');

const getDashboard = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [totalOrders, totalRevenue, totalCustomers, totalProducts, todayOrders, lowStock] = await Promise.all([
      Order.count(),
      Order.sum('total', { where: { paymentStatus: 'paid' } }),
      User.count({ where: { role: 'customer' } }),
      Product.count({ where: { isActive: true } }),
      Order.count({ where: { createdAt: { [Op.gte]: today } } }),
      Product.count({ where: { stock: { [Op.lte]: 10 }, isActive: true } }),
    ]);
    const recentOrders = await Order.findAll({ order: [['createdAt', 'DESC']], limit: 10, include: [{ model: User, attributes: ['name', 'email'] }] });
    const topProducts = await Product.findAll({ where: { isActive: true }, order: [['soldCount', 'DESC']], limit: 5, attributes: ['id', 'name', 'soldCount', 'stock', 'price'] });

    res.json({
      success: true,
      stats: { totalOrders, totalRevenue: totalRevenue || 0, totalCustomers, totalProducts, todayOrders, lowStock },
      recentOrders,
      topProducts,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, paymentStatus, startDate, endDate } = req.query;
    const where = {};
    if (status) where.orderStatus = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (startDate && endDate) where.createdAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    const { count, rows } = await Order.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      include: [{ model: User, attributes: ['name', 'email', 'phone'] }],
    });
    res.json({ success: true, orders: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / limit) });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    const { orderStatus, trackingUrl } = req.body;
    const updateData = { orderStatus };
    if (trackingUrl) updateData.trackingUrl = trackingUrl;
    if (orderStatus === 'delivered') updateData.deliveredAt = new Date();
    if (orderStatus === 'cancelled') updateData.cancelledAt = new Date();
    await order.update(updateData);
    res.json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const where = { role: 'customer' };
    if (search) where[Op.or] = [{ name: { [Op.iLike]: `%${search}%` } }, { email: { [Op.iLike]: `%${search}%` } }];
    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password', 'refreshToken', 'resetPasswordToken', 'resetPasswordExpires'] },
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, customers: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / limit) });
  } catch (error) {
    next(error);
  }
};

const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.update({ isActive: !user.isActive });
    res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'blocked'}`, user });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Product, attributes: ['id', 'name', 'slug'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    await review.update({ isApproved: true });
    const allReviews = await Review.findAll({ where: { productId: review.productId, isApproved: true } });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / (allReviews.length || 1);
    await Product.update({ rating: Math.round(avgRating * 10) / 10, numReviews: allReviews.length }, { where: { id: review.productId } });
    res.json({ success: true, message: 'Review approved' });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    await review.destroy();
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};

const getSiteSettings = async (req, res, next) => {
  try {
    const settings = await SiteSetting.findAll();
    const formatted = {};
    settings.forEach(s => { formatted[s.key] = s.value; });
    res.json({ success: true, settings: formatted });
  } catch (error) {
    next(error);
  }
};

const updateSiteSettings = async (req, res, next) => {
  try {
    const { key, value } = req.body;
    await SiteSetting.upsert({ key, value });
    res.json({ success: true, message: 'Settings updated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, getAllOrders, updateOrderStatus, getCustomers, toggleUserStatus, getReviews, approveReview, deleteReview, getSiteSettings, updateSiteSettings };
