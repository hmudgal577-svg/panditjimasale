const router = require('express').Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart, syncCartItems } = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getCart);
router.post('/sync', authenticate, syncCartItems);
router.post('/', authenticate, addToCart);
router.put('/:id', authenticate, updateCartItem);
router.delete('/:id', authenticate, removeFromCart);
router.delete('/', authenticate, clearCart);

module.exports = router;
