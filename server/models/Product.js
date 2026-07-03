const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  shortDescription: { type: DataTypes.STRING, allowNull: true },
  ingredients: { type: DataTypes.TEXT, allowNull: true },
  nutritionalInfo: { type: DataTypes.TEXT, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discountPrice: { type: DataTypes.FLOAT, allowNull: true },
  mrp: { type: DataTypes.FLOAT, allowNull: true },
  categoryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Categories', key: 'id' } },
  images: { type: DataTypes.JSONB, defaultValue: [] },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
  isOrganic: { type: DataTypes.BOOLEAN, defaultValue: false },
  weightOptions: { type: DataTypes.JSONB, defaultValue: [] },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  seoTitle: { type: DataTypes.STRING, allowNull: true },
  seoDescription: { type: DataTypes.TEXT, allowNull: true },
  soldCount: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: true });

module.exports = Product;
