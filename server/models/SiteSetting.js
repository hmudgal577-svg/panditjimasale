const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SiteSetting = sequelize.define('SiteSetting', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key: { type: DataTypes.STRING, allowNull: false, unique: true },
  value: { type: DataTypes.JSONB, allowNull: false },
}, { timestamps: true });

module.exports = SiteSetting;
