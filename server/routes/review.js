const router = require('express').Router();
const { getProductReviews, createReview, deleteReview } = require('../controllers/reviewController');
const { authenticate, optionalAuth } = require('../middleware/auth');

router.get('/product/:productId', getProductReviews);
router.post('/', authenticate, createReview);
router.delete('/:id', authenticate, deleteReview);

module.exports = router;
