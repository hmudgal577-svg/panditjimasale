const { Review, Product, Order } = require('../models');
const { Op } = require('sequelize');

const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId, isApproved: true },
      include: [{ association: 'User', attributes: ['name', 'avatar'] }],
      order: [['createdAt', 'DESC']],
      limit: 20,
    });
    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment } = req.body;
    const existing = await Review.findOne({ where: { userId: req.user.id, productId } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You already reviewed this product' });
    }
    const purchased = await Order.findOne({
      where: { userId: req.user.id, paymentStatus: 'paid', orderStatus: { [Op.in]: ['delivered', 'shipped', 'out_for_delivery'] } },
    });
    const review = await Review.create({
      userId: req.user.id,
      productId,
      rating,
      title,
      comment,
      orderId: purchased?.id || null,
      isApproved: false,
    });
    const allReviews = await Review.findAll({ where: { productId, isApproved: true } });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / (allReviews.length || 1);
    await Product.update({ rating: Math.round(avgRating * 10) / 10, numReviews: allReviews.length }, { where: { id: productId } });
    res.status(201).json({ success: true, message: 'Review submitted for approval', review });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    await review.destroy();
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProductReviews, createReview, deleteReview };
