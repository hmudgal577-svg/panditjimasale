import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { logout } from '../../store/authSlice';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { itemCount } = useSelector(state => state.cart);
  const wishlistItems = useSelector(state => state.wishlist.items);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }); } catch {}
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center">
              <span className="text-gold font-heading font-bold text-lg">PJ</span>
            </div>
            <div>
              <span className="font-heading text-xl font-bold text-maroon">Pandit Ji</span>
              <span className="hidden md:block text-xs text-gold-dark font-medium">Shudhta Aapke Ghar Tak</span>
            </div>
          </Link>
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input type="text" placeholder="Search spices, dry fruits..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-maroon focus:border-transparent outline-none bg-cream" />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </form>
          <div className="flex items-center space-x-3 md:space-x-4">
            <Link to="/" className="hidden md:block text-darkbrown hover:text-maroon font-medium transition-colors">Home</Link>
            <Link to="/shop" className="hidden md:block text-darkbrown hover:text-maroon font-medium transition-colors">Shop</Link>
            <Link to="/blog" className="hidden md:block text-darkbrown hover:text-maroon font-medium transition-colors">Blog</Link>
            <Link to="/about" className="hidden md:block text-darkbrown hover:text-maroon font-medium transition-colors">About</Link>
            <Link to="/contact" className="hidden md:block text-darkbrown hover:text-maroon font-medium transition-colors">Contact</Link>
            <button onClick={() => navigate('/shop?search=')} className="md:hidden p-2 text-darkbrown hover:text-maroon"><FiSearch size={20} /></button>
            <Link to="/wishlist" className="relative p-2 text-darkbrown hover:text-maroon">
              <FiHeart size={20} />
              {wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-maroon text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{wishlistItems.length}</span>}
            </Link>
            <Link to="/cart" className="relative p-2 text-darkbrown hover:text-maroon">
              <FiShoppingCart size={20} />
              {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-saffron text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{itemCount}</span>}
            </Link>
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-1 p-2 text-darkbrown hover:text-maroon">
                  <FiUser size={20} /><span className="hidden md:block text-sm">{user?.name?.split(' ')[0]}</span><FiChevronDown size={14} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 animate-fade-in" onMouseLeave={() => setShowUserMenu(false)}>
                    <Link to="/account" className="block px-4 py-2 hover:bg-cream text-darkbrown">My Account</Link>
                    <Link to="/orders" className="block px-4 py-2 hover:bg-cream text-darkbrown">My Orders</Link>
                    <Link to="/wishlist" className="block px-4 py-2 hover:bg-cream text-darkbrown">Wishlist</Link>
                    <Link to="/addresses" className="block px-4 py-2 hover:bg-cream text-darkbrown">Addresses</Link>
                    {user?.role === 'admin' && <Link to="/admin" className="block px-4 py-2 hover:bg-cream text-maroon font-semibold">Admin Panel</Link>}
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-cream text-red-600">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-1.5 px-4">Login</Link>
            )}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-darkbrown">
              {mobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-inner animate-slide-down">
          <div className="px-4 py-3 space-y-2">
            <form onSubmit={handleSearch}>
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-cream" />
            </form>
            <Link to="/" className="block py-2 hover:text-maroon font-medium" onClick={() => setMobileMenu(false)}>Home</Link>
            <Link to="/shop" className="block py-2 hover:text-maroon font-medium" onClick={() => setMobileMenu(false)}>Shop All</Link>
            <Link to="/shop?category=whole-spices" className="block py-2 hover:text-maroon" onClick={() => setMobileMenu(false)}>🌶️ Khade Masale</Link>
            <Link to="/shop?category=dry-fruits" className="block py-2 hover:text-maroon" onClick={() => setMobileMenu(false)}>🥜 Dry Fruits</Link>
            <Link to="/shop?category=pooja-items" className="block py-2 hover:text-maroon" onClick={() => setMobileMenu(false)}>🪔 Pooja Samagri</Link>
            <Link to="/blog" className="block py-2 hover:text-maroon font-medium" onClick={() => setMobileMenu(false)}>📚 Blog</Link>
            <Link to="/about" className="block py-2 hover:text-maroon" onClick={() => setMobileMenu(false)}>About Us</Link>
            <Link to="/contact" className="block py-2 hover:text-maroon" onClick={() => setMobileMenu(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
