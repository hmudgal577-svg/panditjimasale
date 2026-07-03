const { Wishlist, Product } = require('../models');

const getWishlist = async (req, res, next) => {
  try {
    const items = await Wishlist.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'name', 'slug', 'price', 'discountPrice', 'images', 'rating', 'stock', 'weightOptions'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const existing = await Wishlist.findOne({ where: { userId: req.user.id, productId } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Already in wishlist' });
    }
    await Wishlist.create({ userId: req.user.id, productId });
    const items = await Wishlist.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'name', 'slug', 'price', 'discountPrice', 'images', 'rating', 'stock'] }],
    });
    res.status(201).json({ success: true, message: 'Added to wishlist', items });
  } catch (error) {
    next(error);
  }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    await Wishlist.destroy({ where: { id: req.params.id, userId: req.user.id } });
    const items = await Wishlist.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'name', 'slug', 'price', 'discountPrice', 'images', 'rating', 'stock'] }],
    });
    res.json({ success: true, message: 'Removed from wishlist', items });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
