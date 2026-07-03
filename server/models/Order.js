const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.STRING, allowNull: false, unique: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
  items: { type: DataTypes.JSONB, allowNull: false },
  shippingAddress: { type: DataTypes.JSONB, allowNull: false },
  billingAddress: { type: DataTypes.JSONB, allowNull: true },
  subtotal: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  deliveryCharge: { type: DataTypes.FLOAT, defaultValue: 0 },
  gst: { type: DataTypes.FLOAT, defaultValue: 0 },
  total: { type: DataTypes.FLOAT, allowNull: false },
  couponCode: { type: DataTypes.STRING, allowNull: true },
  couponDiscount: { type: DataTypes.FLOAT, defaultValue: 0 },
  paymentMethod: { type: DataTypes.STRING, defaultValue: 'razorpay' },
  paymentStatus: { type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'), defaultValue: 'pending' },
  paymentId: { type: DataTypes.STRING, allowNull: true },
  razorpayOrderId: { type: DataTypes.STRING, allowNull: true },
  orderStatus: {
    type: DataTypes.ENUM('placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'),
    defaultValue: 'placed',
  },
  notes: { type: DataTypes.TEXT, allowNull: true },
  estimatedDelivery: { type: DataTypes.DATE, allowNull: true },
  deliveredAt: { type: DataTypes.DATE, allowNull: true },
  cancelledAt: { type: DataTypes.DATE, allowNull: true },
  cancelReason: { type: DataTypes.STRING, allowNull: true },
  trackingUrl: { type: DataTypes.STRING, allowNull: true },
  invoiceUrl: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: true });

module.exports = Order;
