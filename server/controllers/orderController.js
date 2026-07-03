const { Order, Cart, Product, Address, Coupon } = require('../models');
const { generateOrderId, calculateGST } = require('../utils/helpers');
const { Op } = require('sequelize');

const createOrder = async (req, res, next) => {
  try {
    const { addressId, paymentMethod = 'razorpay', notes, couponCode } = req.body;
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product }],
    });
    if (!cartItems.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }
    const address = await Address.findOne({ where: { id: addressId, userId: req.user.id } });
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    const items = cartItems.map(item => ({
      productId: item.productId,
      name: item.Product.name,
      slug: item.Product.slug,
      image: item.Product.images?.[0] || '',
      quantity: item.quantity,
      weight: item.weight,
      price: item.price,
      total: item.price * item.quantity,
    }));
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    let discount = 0;
    let couponDiscount = 0;
    let appliedCoupon = null;
    if (couponCode) {
      appliedCoupon = await Coupon.findOne({ where: { code: couponCode.toUpperCase(), isActive: true, expiresAt: { [Op.or]: [{ [Op.gte]: new Date() }, null] } } });
      if (!appliedCoupon || appliedCoupon.usedCount >= appliedCoupon.usageLimit) {
        return res.status(400).json({ success: false, message: 'Invalid or expired coupon' });
      }
      if (subtotal < appliedCoupon.minOrderValue) {
        return res.status(400).json({ success: false, message: `Minimum order value of ₹${appliedCoupon.minOrderValue} required` });
      }
      if (appliedCoupon.type === 'percentage') {
        couponDiscount = Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount || Infinity);
      } else {
        couponDiscount = appliedCoupon.value;
      }
      await appliedCoupon.update({ usedCount: appliedCoupon.usedCount + 1 });
    }
    const deliveryCharge = subtotal >= 499 ? 0 : 40;
    const gst = calculateGST(subtotal - couponDiscount);
    const total = Math.max(0, subtotal - couponDiscount + deliveryCharge + gst);
    const orderId = generateOrderId();
    const order = await Order.create({
      orderId,
      userId: req.user.id,
      items,
      shippingAddress: address.toJSON(),
      subtotal,
      discount,
      deliveryCharge,
      gst,
      total,
      couponCode: couponCode?.toUpperCase() || null,
      couponDiscount,
      paymentMethod,
      notes,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });
    await Cart.destroy({ where: { userId: req.user.id } });
    for (const item of items) {
      await Product.increment({ soldCount: item.quantity, stock: -item.quantity }, { where: { id: item.productId } });
    }
    res.status(201).json({ success: true, message: 'Order created', order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const where = { userId: req.user.id };
    if (status) where.orderStatus = status;
    const { count, rows } = await Order.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });
    res.json({ success: true, orders: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / limit) });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ where: { orderId: req.params.orderId, userId: req.user.id } });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const order = await Order.findOne({ where: { orderId: req.params.orderId, userId: req.user.id } });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (!['placed', 'confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({ success: false, message: 'Order cannot be cancelled at this stage' });
    }
    await order.update({ orderStatus: 'cancelled', cancelledAt: new Date(), cancelReason: reason });
    for (const item of order.items) {
      await Product.increment({ stock: item.quantity, soldCount: -item.quantity }, { where: { id: item.productId } });
    }
    res.json({ success: true, message: 'Order cancelled', order });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrder, cancelOrder };
