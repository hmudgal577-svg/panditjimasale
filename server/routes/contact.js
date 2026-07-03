const router = require('express').Router();
const { contact } = require('../controllers/contactController');
const { apiLimiter } = require('../middleware/rateLimiter');

router.post('/', apiLimiter, contact);

module.exports = router;
