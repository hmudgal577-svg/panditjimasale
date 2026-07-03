const router = require('express').Router();
const { createPaymentOrder, verifyRazorpayPayment, razorpayWebhook } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

router.post('/create-order', authenticate, createPaymentOrder);
router.post('/verify', authenticate, verifyRazorpayPayment);
router.post('/webhook', razorpayWebhook);

module.exports = router;
