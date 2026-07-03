const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Coupon = sequelize.define('Coupon', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  type: { type: DataTypes.ENUM('percentage', 'flat'), defaultValue: 'percentage' },
  value: { type: DataTypes.FLOAT, allowNull: false },
  minOrderValue: { type: DataTypes.FLOAT, defaultValue: 0 },
  maxDiscount: { type: DataTypes.FLOAT, allowNull: true },
  usageLimit: { type: DataTypes.INTEGER, defaultValue: 100 },
  usedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  expiresAt: { type: DataTypes.DATE, allowNull: true },
}, { timestamps: true });

module.exports = Coupon;
