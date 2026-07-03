const Razorpay = require('razorpay');
const crypto = require('crypto');

// Lazy initialization — only create instance when keys are available
// This prevents server crash on startup if Razorpay keys are not set
const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.includes('xxxx') || keyId === 'your_key_here') {
    throw new Error('Razorpay keys not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.');
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

const createOrder = async (amount, currency = 'INR') => {
  const razorpay = getRazorpayInstance();
  const options = {
    amount: Math.round(amount * 100),
    currency,
    receipt: 'receipt_' + Date.now(),
  };
  const order = await razorpay.orders.create(options);
  return order;
};

const verifyPayment = (orderId, paymentId, signature) => {
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');
  return expectedSignature === signature;
};

module.exports = { getRazorpayInstance, createOrder, verifyPayment };
