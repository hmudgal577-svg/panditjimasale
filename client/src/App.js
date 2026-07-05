import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './store/authSlice';
import { fetchCart, syncLocalCartToAPI, syncCart } from './store/cartSlice';
import { fetchWishlist, syncWishlist } from './store/wishlistSlice';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import WishlistPage from './pages/WishlistPage';
import Addresses from './pages/Addresses';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import ShippingPolicy from './pages/ShippingPolicy';
import NotFound from './pages/NotFound';
import { BlogList, BlogPost } from './pages/Blog';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminOrders from './components/admin/AdminOrders';
import AdminCustomers from './components/admin/AdminCustomers';
import AdminCategories from './components/admin/AdminCategories';
import AdminCoupons from './components/admin/AdminCoupons';
import AdminReviews from './components/admin/AdminReviews';
import AdminSettings from './components/admin/AdminSettings';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/common/ProtectedRoute';

const WHATSAPP_NUMBER = '917415992703';
const WHATSAPP_MSG = encodeURIComponent('Namaste! Pandit Ji Masale se order karna chahta hoon.');

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
    target="_blank"
    rel="noopener noreferrer"
    id="whatsapp-float-btn"
    aria-label="Order on WhatsApp"
    style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
      background: '#25D366', color: '#fff', borderRadius: '50px',
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '12px 20px', boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
      textDecoration: 'none', fontWeight: '600', fontSize: '15px',
      animation: 'pulse-green 2s infinite',
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span className="hidden md:inline">Order on WhatsApp</span>
  </a>
);

const BlogPostWrapper = () => { const { slug } = useParams(); return <BlogPost slug={slug} />; };

const MainLayout = () => (
  <>
    <Navbar />
    <div className="min-h-screen">
      <Outlet />
    </div>
    <Footer />
    <WhatsAppButton />
  </>
);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
      // Sync any guest cart items to DB, then fetch fresh cart
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (localCart.length > 0) {
        dispatch(syncLocalCartToAPI(localCart)).then(() => {
          localStorage.removeItem('cart');
          localStorage.removeItem('cartCount');
        });
      } else {
        dispatch(fetchCart());
      }
      dispatch(fetchWishlist());
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      dispatch(syncCart({ items: localCart }));
      dispatch(syncWishlist(localWishlist));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <HelmetProvider>
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: '#2B1B12', color: '#fff', borderRadius: '10px' } }} />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostWrapper />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
    </HelmetProvider>
  );
}

export default App;
