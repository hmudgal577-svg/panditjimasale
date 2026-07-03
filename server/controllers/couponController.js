const { Coupon } = require('../models');
const { Op } = require('sequelize');

const validateCoupon = async (req, res, next) => {
  try {
    const { code, orderValue } = req.body;
    const coupon = await Coupon.findOne({
      where: {
        code: code.toUpperCase(),
        isActive: true,
        [Op.or]: [{ expiresAt: { [Op.gte]: new Date() } }, { expiresAt: null }],
      },
    });
    if (!coupon || coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: 'Invalid or expired coupon' });
    }
    if (orderValue < coupon.minOrderValue) {
      return res.status(400).json({ success: false, message: `Minimum order value of ₹${coupon.minOrderValue} required` });
    }
    let discount;
    if (coupon.type === 'percentage') {
      discount = Math.min((orderValue * coupon.value) / 100, coupon.maxDiscount || Infinity);
    } else {
      discount = coupon.value;
    }
    res.json({ success: true, coupon: { ...coupon.toJSON(), calculatedDiscount: discount } });
  } catch (error) {
    next(error);
  }
};

const getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, coupons });
  } catch (error) {
    next(error);
  }
};

const createCoupon = async (req, res, next) => {
  try {
    const data = { ...req.body, code: req.body.code.toUpperCase() };
    const coupon = await Coupon.create(data);
    res.status(201).json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};

const updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ success: false, message: 'Coupon not found' });
    await coupon.update(req.body);
    res.json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};

const deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ success: false, message: 'Coupon not found' });
    await coupon.destroy();
    res.json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { validateCoupon, getCoupons, createCoupon, updateCoupon, deleteCoupon };
