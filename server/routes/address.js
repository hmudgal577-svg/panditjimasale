const router = require('express').Router();
const { getAddresses, createAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const { authenticate } = require('../middleware/auth');
const { validateAddress } = require('../middleware/validate');

router.get('/', authenticate, getAddresses);
router.post('/', authenticate, validateAddress, createAddress);
router.put('/:id', authenticate, updateAddress);
router.delete('/:id', authenticate, deleteAddress);

module.exports = router;
