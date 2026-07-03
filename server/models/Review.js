const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Products', key: 'id' } },
  orderId: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Orders', key: 'id' } },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  title: { type: DataTypes.STRING, allowNull: true },
  comment: { type: DataTypes.TEXT, allowNull: true },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

module.exports = Review;
