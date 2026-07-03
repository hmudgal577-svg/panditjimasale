const { Product, Category, Review, User } = require('../models');
const { Op } = require('sequelize');
const { slugify } = require('../utils/helpers');

const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, category, search, sort, minPrice, maxPrice, minRating, tags, isOrganic, isFeatured } = req.query;
    const offset = (page - 1) * limit;
    const where = { isActive: true };

    if (category) {
      const cat = await Category.findOne({ where: { slug: category } });
      if (cat) where.categoryId = cat.id;
    }
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { tags: { [Op.overlap]: [search] } },
      ];
    }
    if (minPrice) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
    if (minRating) where.rating = { [Op.gte]: parseFloat(minRating) };
    if (isOrganic === 'true') where.isOrganic = true;
    if (isFeatured === 'true') where.isFeatured = true;
    if (tags) where.tags = { [Op.overlap]: tags.split(',') };

    let order = [['createdAt', 'DESC']];
    if (sort === 'price_asc') order = [['price', 'ASC']];
    else if (sort === 'price_desc') order = [['price', 'DESC']];
    else if (sort === 'rating') order = [['rating', 'DESC']];
    else if (sort === 'popular') order = [['soldCount', 'DESC']];
    else if (sort === 'newest') order = [['createdAt', 'DESC']];

    const { count, rows } = await Product.findAndCountAll({
      where,
      order,
      offset: parseInt(offset),
      limit: parseInt(limit),
      include: [{ model: Category, attributes: ['id', 'name', 'slug'] }],
    });

    res.json({
      success: true,
      products: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: Category, attributes: ['id', 'name', 'slug'] },
        { model: Review, include: [{ model: User, attributes: ['name', 'avatar'] }], where: { isApproved: true }, required: false, limit: 10, order: [['createdAt', 'DESC']] },
      ],
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { isFeatured: true, isActive: true },
      limit: 12,
      order: [['soldCount', 'DESC']],
      include: [{ model: Category, attributes: ['id', 'name', 'slug'] }],
    });
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

const searchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, suggestions: [] });
    const products = await Product.findAll({
      where: { name: { [Op.iLike]: `%${q}%` }, isActive: true },
      attributes: ['id', 'name', 'slug', 'price', 'discountPrice', 'images'],
      limit: 8,
    });
    res.json({ success: true, suggestions: products });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.slug = slugify(data.name) + '-' + Date.now();
    if (req.files && req.files.length > 0) {
      data.images = req.files.map(f => '/uploads/' + f.filename);
    }
    if (data.weightOptions && typeof data.weightOptions === 'string') {
      data.weightOptions = JSON.parse(data.weightOptions);
    }
    if (data.tags && typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(t => t.trim());
    }
    const product = await Product.create(data);
    res.status(201).json({ success: true, message: 'Product created', product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    const data = { ...req.body };
    let currentImages = [];
    if (req.body.imagesList) {
      try {
        currentImages = JSON.parse(req.body.imagesList);
      } catch (e) {
        currentImages = [];
      }
    } else {
      currentImages = product.images || [];
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(f => '/uploads/' + f.filename);
      data.images = [...currentImages, ...newImages];
    } else {
      data.images = currentImages;
    }
    if (data.weightOptions && typeof data.weightOptions === 'string') {
      data.weightOptions = JSON.parse(data.weightOptions);
    }
    if (data.tags && typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(t => t.trim());
    }
    await product.update(data);
    res.json({ success: true, message: 'Product updated', product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await product.update({ isActive: false });
    res.json({ success: true, message: 'Product deactivated' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProduct, getFeaturedProducts, searchSuggestions, createProduct, updateProduct, deleteProduct };
