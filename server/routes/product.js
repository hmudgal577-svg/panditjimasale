const router = require('express').Router();
const { getProducts, getProduct, getFeaturedProducts, searchSuggestions, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticate, authorizeAdmin, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/search-suggestions', searchSuggestions);
router.get('/:slug', optionalAuth, getProduct);
router.post('/', authenticate, authorizeAdmin, upload.array('images', 10), createProduct);
router.put('/:id', authenticate, authorizeAdmin, upload.array('images', 10), updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

module.exports = router;
