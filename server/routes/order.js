const router = require('express').Router();
const { createOrder, getOrders, getOrder, cancelOrder } = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:orderId', authenticate, getOrder);
router.put('/:orderId/cancel', authenticate, cancelOrder);

module.exports = router;
