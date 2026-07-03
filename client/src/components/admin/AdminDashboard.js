import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { FiShoppingBag, FiDollarSign, FiUsers, FiPackage, FiAlertTriangle } from 'react-icons/fi';

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/admin/dashboard').then(({ data }) => setData(data)).catch(() => {});
  }, []);

  if (!data) return <div className="text-center py-12"><div className="skeleton h-48 w-full rounded-xl" /></div>;

  const { stats, recentOrders, topProducts } = data;

  const cards = [
    { icon: <FiShoppingBag size={24} />, label: 'Today Orders', value: stats.todayOrders, color: 'bg-blue-500' },
    { icon: <FiDollarSign size={24} />, label: 'Total Revenue', value: `₹${stats.totalRevenue?.toLocaleString()}`, color: 'bg-green-500' },
    { icon: <FiPackage size={24} />, label: 'Total Orders', value: stats.totalOrders, color: 'bg-saffron' },
    { icon: <FiUsers size={24} />, label: 'Customers', value: stats.totalCustomers, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Dashboard</h1>

      {stats.lowStock > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
          <FiAlertTriangle className="text-red-500" />
          <p className="text-red-700 font-medium">{stats.lowStock} product(s) have low stock (≤10 units). <a href="/admin/products" className="underline">View products</a></p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="card p-4 md:p-6">
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white mb-3`}>{card.icon}</div>
            <p className="text-gray-500 text-sm">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-heading font-bold text-lg mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left border-b"><th className="pb-2">Order</th><th className="pb-2">Customer</th><th className="pb-2">Amount</th><th className="pb-2">Status</th></tr></thead>
              <tbody>
                {recentOrders?.slice(0, 6).map(order => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-2 font-medium">#{order.orderId?.slice(0, 10)}</td>
                    <td className="py-2">{order.User?.name}</td>
                    <td className="py-2">₹{order.total}</td>
                    <td className="py-2"><span className={`badge text-xs ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' : order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{order.orderStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-heading font-bold text-lg mb-4">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left border-b"><th className="pb-2">Product</th><th className="pb-2">Sold</th><th className="pb-2">Stock</th><th className="pb-2">Price</th></tr></thead>
              <tbody>
                {topProducts?.map(p => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-2 font-medium">{p.name?.slice(0, 30)}</td>
                    <td className="py-2">{p.soldCount}</td>
                    <td className="py-2"><span className={p.stock <= 10 ? 'text-red-600 font-semibold' : ''}>{p.stock}</span></td>
                    <td className="py-2">₹{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
