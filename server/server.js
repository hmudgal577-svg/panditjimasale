const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jpg')) {
      const fs = require('fs');
      try {
        const fileHead = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }).slice(0, 100);
        if (fileHead.includes('<svg') || fileHead.includes('<?xml')) {
          res.setHeader('Content-Type', 'image/svg+xml');
        }
      } catch (err) {
        // Silently ignore file read errors
      }
    }
  }
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/product'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/coupons', require('./routes/coupon'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/address', require('./routes/address'));
app.use('/api/contact', require('./routes/contact'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pandit Ji API is running' });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync({ force: false });

    // Auto-seed database if empty (first time deployment)
    try {
      const { Product } = require('./models');
      const productCount = await Product.count();
      if (productCount === 0) {
        console.log('Database is empty — running auto-seed...');
        const seed = require('./seeders/seed');
        if (typeof seed === 'function') {
          await seed();
        } else {
          // seed.js runs itself, just require it
          console.log('Seed script executed on require.');
        }
        console.log('Auto-seed completed!');
      } else {
        console.log(`Database already has ${productCount} products — skipping seed.`);
      }
    } catch (seedErr) {
      console.error('Auto-seed warning (non-fatal):', seedErr.message);
    }

    app.listen(PORT, () => {
      console.log(`Pandit Ji server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
