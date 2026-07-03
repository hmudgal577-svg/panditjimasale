import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { FiGrid, FiPackage, FiShoppingBag, FiUsers, FiTag, FiPercent, FiStar, FiSettings, FiLogOut, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const links = [
    { to: '/admin', icon: <FiGrid />, label: 'Dashboard', exact: true },
    { to: '/admin/products', icon: <FiPackage />, label: 'Products' },
    { to: '/admin/orders', icon: <FiShoppingBag />, label: 'Orders' },
    { to: '/admin/customers', icon: <FiUsers />, label: 'Customers' },
    { to: '/admin/categories', icon: <FiTag />, label: 'Categories' },
    { to: '/admin/coupons', icon: <FiPercent />, label: 'Coupons' },
    { to: '/admin/reviews', icon: <FiStar />, label: 'Reviews' },
    { to: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
  ];

  const isActive = (link) => link.exact ? location.pathname === link.to : location.pathname.startsWith(link.to);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`${sidebarOpen ? 'fixed inset-0 z-50' : 'hidden'} lg:relative lg:block lg:w-64 bg-darkbrown text-white`}>
        <div className="lg:sticky lg:top-0 lg:h-screen overflow-auto">
          <div className="p-4 flex items-center justify-between lg:justify-start border-b border-white/10">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-maroon rounded-full flex items-center justify-center"><span className="text-gold font-bold">PJ</span></div>
              <div><span className="font-heading font-bold text-gold">Pandit Ji</span><span className="block text-xs text-gray-400">Admin Panel</span></div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white"><FiX size={24} /></button>
          </div>
          <nav className="p-3 space-y-1">
            {links.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setSidebarOpen(false)} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${isActive(link) ? 'bg-maroon text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                {link.icon} <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t border-white/10 mt-4">
            <Link to="/" className="flex items-center space-x-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 rounded-lg"><FiChevronDown className="rotate-90" /><span>View Store</span></Link>
            <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 rounded-lg w-full"><FiLogOut /><span>Logout</span></button>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between lg:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><FiMenu size={24} /></button>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <div className="w-8 h-8 bg-maroon/10 rounded-full flex items-center justify-center text-maroon font-bold text-sm">{user?.name?.[0]}</div>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
