const router = require('express').Router();
const { validateCoupon, getCoupons, createCoupon, updateCoupon, deleteCoupon } = require('../controllers/couponController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.post('/validate', authenticate, validateCoupon);
router.get('/', authenticate, authorizeAdmin, getCoupons);
router.post('/', authenticate, authorizeAdmin, createCoupon);
router.put('/:id', authenticate, authorizeAdmin, updateCoupon);
router.delete('/:id', authenticate, authorizeAdmin, deleteCoupon);

module.exports = router;
