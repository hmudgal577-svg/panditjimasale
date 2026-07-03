const { Cart, Product } = require('../models');

const getCart = async (req, res, next) => {
  try {
    const items = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'name', 'slug', 'price', 'discountPrice', 'images', 'stock', 'weightOptions'] }],
    });
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, weight } = req.body;
    const product = await Product.findByPk(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const price = weight && product.weightOptions
      ? (product.weightOptions.find(w => w.label === weight)?.price || product.discountPrice || product.price)
      : (product.discountPrice || product.price);

    const existing = await Cart.findOne({ where: { userId: req.user.id, productId, weight: weight || null } });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
    } else {
      await Cart.create({ userId: req.user.id, productId, quantity, weight, price });
    }
    const items = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'name', 'slug', 'price', 'discountPrice', 'images', 'stock'] }],
    });
    res.json({ success: true, message: 'Added to cart', items });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const item = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!item) return res.status(404).json({ success: false, message: 'Cart item not found' });
    if (quantity <= 0) {
      await item.destroy();
    } else {
      item.quantity = quantity;
      await item.save();
    }
    const items = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'name', 'slug', 'price', 'discountPrice', 'images', 'stock'] }],
    });
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    await Cart.destroy({ where: { id: req.params.id, userId: req.user.id } });
    const items = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, attributes: ['id', 'name', 'slug', 'price', 'discountPrice', 'images', 'stock'] }],
    });
    res.json({ success: true, message: 'Removed from cart', items });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    await Cart.destroy({ where: { userId: req.user.id } });
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
