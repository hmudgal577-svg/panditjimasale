# 🏪 Pandit Ji - Premium Indian Spices & Dry Fruits E-Commerce

**Shudhta Aapke Ghar Tak** — A full-stack e-commerce platform for selling Indian spices (masale), dry fruits, and traditional grocery items.

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18, Redux Toolkit, React Router v6, Tailwind CSS, react-hot-toast, Recharts |
| Backend    | Node.js, Express.js, Sequelize ORM, PostgreSQL  |
| Auth       | JWT (access + refresh tokens), bcrypt           |
| Payments   | Razorpay (test mode)                           |
| Storage    | Local /uploads with multer                     |
| Security   | Helmet, CORS, express-rate-limit, express-validator |

## Features

### Customer-facing
- Home page with hero banners, category showcase, featured products, testimonials, newsletter signup
- Shop page with filters (category, price, rating, organic), sorting, search with suggestions, pagination
- Product detail page with image gallery, weight-based pricing, reviews, related products
- Cart with quantity controls, coupon codes, price breakdown
- Multi-step checkout with address management and Razorpay payment integration
- User accounts: login/register, profile, orders, wishlist, addresses
- Static pages: About, Contact, FAQ, Privacy Policy, Terms, Shipping Policy
- Responsive design (mobile-first), SEO basics, image lazy loading

### Admin Dashboard
- Overview with sales stats, recent orders, low stock alerts
- Product management (CRUD, search)
- Order management (status updates, details)
- Customer management (search, block/unblock)
- Category management
- Coupon/discount creation
- Review moderation
- Site settings (delivery charges, GST)

## Project Structure

```
panditjimasale/
├── server/                  # Express.js backend
│   ├── config/              # Database configuration
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Auth, validation, upload, rate limiter
│   ├── models/              # Sequelize models
│   ├── routes/              # Express routes
│   ├── seeders/             # Seed data script
│   ├── uploads/             # Image uploads directory
│   ├── utils/               # Helpers, token generation, Razorpay utils
│   ├── package.json
│   └── server.js            # Entry point
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components (admin, layout, common)
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux Toolkit slices
│   │   ├── styles/          # Tailwind CSS config
│   │   └── utils/           # Axios API client
│   ├── package.json
│   └── tailwind.config.js
├── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js v16+
- PostgreSQL 14+
- npm or yarn
- Razorpay test account (optional for payment testing)

### 1. Clone and Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE panditji_db;"
```

### 3. Environment Variables

Copy `.env.example` to `server/.env` and update with your values:

```bash
cp .env.example server/.env
```

Required environment variables:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` — PostgreSQL credentials
- `JWT_SECRET`, `JWT_REFRESH_SECRET` — Random strings for token signing
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` — From Razorpay dashboard (test mode)
- `FRONTEND_URL` — Default: http://localhost:3000

### 4. Seed Database

```bash
cd server
npm run seed
```

This creates:
- Admin account: `admin@panditji.com` / `admin123`
- Customer account: `rahul@example.com` / `customer123`
- 7 categories and 20 sample products
- Site settings

### 5. Start Development Servers

```bash
# Terminal 1 - Backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 - Frontend (http://localhost:3000)
cd client
npm start
```

### 6. Access the Application

| Page                  | URL                                    |
|-----------------------|----------------------------------------|
| Home                  | http://localhost:3000                  |
| Shop                  | http://localhost:3000/shop             |
| Admin Dashboard       | http://localhost:3000/admin            |
| Admin Login           | http://localhost:3000/admin/login      |

## API Endpoints

| Endpoint              | Method | Description          | Auth Required |
|-----------------------|--------|----------------------|---------------|
| /api/auth/register    | POST   | Register user        | No            |
| /api/auth/login       | POST   | Login                | No            |
| /api/auth/admin-login| POST   | Admin login          | No            |
| /api/products         | GET    | List products        | No            |
| /api/products/featured| GET    | Featured products    | No            |
| /api/products/:slug   | GET    | Product detail       | No            |
| /api/cart             | GET    | Get cart             | Yes           |
| /api/cart             | POST   | Add to cart          | Yes           |
| /api/orders           | POST   | Create order         | Yes           |
| /api/payment/create-order | POST | Razorpay order    | Yes           |
| /api/payment/verify   | POST   | Verify payment       | Yes           |
| /api/admin/dashboard  | GET    | Dashboard stats      | Admin         |
| /api/admin/orders     | GET    | All orders           | Admin         |

## Security Features

- Passwords hashed with bcrypt (12 salt rounds)
- JWT access tokens (15 min) + refresh tokens (7 days)
- Input validation on all forms (frontend + backend)
- SQL injection protection via Sequelize parameterized queries
- XSS protection via input sanitization
- CORS whitelist (only frontend domain)
- Helmet.js HTTP security headers
- Rate limiting on auth endpoints (10 req/15 min)
- RBAC (customer/admin roles) with middleware enforcement
- Razorpay payment signature verification (never trust frontend alone)
- All secrets stored in environment variables

## Deployment Notes (Production)

- Set `NODE_ENV=production`
- Use HTTPS (configure reverse proxy like Nginx)
- Use a production-grade PostgreSQL instance
- Set strong JWT secrets
- Configure proper CORS origin
- Use Cloudinary/S3 for image storage instead of local uploads
- Set up Razorpay live keys
- Build frontend: `cd client && npm run build` (served via Express or CDN)
