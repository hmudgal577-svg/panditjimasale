const { Order } = require('../models');
const { createOrder: createRazorpayOrder, verifyPayment } = require('../utils/razorpay');

const createPaymentOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ where: { orderId, userId: req.user.id } });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    const razorpayOrder = await createRazorpayOrder(order.total);
    await order.update({ razorpayOrderId: razorpayOrder.id });
    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (error) {
    next(error);
  }
};

const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const order = await Order.findOne({ where: { orderId, userId: req.user.id } });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    const isValid = verifyPayment(order.razorpayOrderId, paymentId, signature);
    if (!isValid) {
      await order.update({ paymentStatus: 'failed' });
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
    await order.update({ paymentStatus: 'paid', paymentId, orderStatus: 'confirmed' });
    res.json({ success: true, message: 'Payment verified successfully', order });
  } catch (error) {
    next(error);
  }
};

const razorpayWebhook = async (req, res, next) => {
  try {
    const event = req.body;
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const order = await Order.findOne({ where: { razorpayOrderId: payment.order_id } });
      if (order && order.paymentStatus !== 'paid') {
        await order.update({ paymentStatus: 'paid', paymentId: payment.id, orderStatus: 'confirmed' });
      }
    }
    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPaymentOrder, verifyRazorpayPayment, razorpayWebhook };
