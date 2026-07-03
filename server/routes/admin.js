const router = require('express').Router();
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const { getDashboard, getAllOrders, updateOrderStatus, getCustomers, toggleUserStatus, getReviews, approveReview, deleteReview, getSiteSettings, updateSiteSettings } = require('../controllers/adminController');

router.use(authenticate, authorizeAdmin);

router.get('/dashboard', getDashboard);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/customers', getCustomers);
router.put('/customers/:id/toggle-status', toggleUserStatus);
router.get('/reviews', getReviews);
router.put('/reviews/:id/approve', approveReview);
router.delete('/reviews/:id', deleteReview);
router.get('/settings', getSiteSettings);
router.put('/settings', updateSiteSettings);

module.exports = router;
