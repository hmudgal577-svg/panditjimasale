const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Products', key: 'id' } },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  weight: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
}, { timestamps: true });

module.exports = Cart;
