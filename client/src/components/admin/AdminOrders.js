import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { loadOrders(); }, [statusFilter]);

  const loadOrders = async () => {
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      const { data } = await API.get('/admin/orders', { params });
      setOrders(data.orders);
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, orderStatus) => {
    try { await API.put(`/admin/orders/${id}/status`, { orderStatus }); toast.success('Status updated'); loadOrders(); } catch { toast.error('Failed'); }
  };

  const statuses = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Orders</h1>
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        <button onClick={() => setStatusFilter('')} className={`px-3 py-1.5 rounded-lg text-sm ${!statusFilter ? 'bg-maroon text-white' : 'bg-gray-100'}`}>All</button>
        {statuses.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${statusFilter === s ? 'bg-maroon text-white' : 'bg-gray-100'}`}>{s.replace(/_/g, ' ')}</button>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><p className="font-bold">#{order.orderId}</p><p className="text-sm text-gray-500">{order.User?.name} • {order.User?.email}</p></div>
              <div className="flex items-center space-x-3">
                <span className="font-bold text-maroon">₹{order.total}</span>
                {expanded === order.id ? (
                  <select value={order.orderStatus} onChange={e => updateStatus(order.id, e.target.value)} className="input-field text-sm py-1 w-36">
                    {statuses.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                  </select>
                ) : (
                  <span className={`badge text-xs ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' : order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{order.orderStatus}</span>
                )}
                <button onClick={() => setExpanded(expanded === order.id ? null : order.id)} className="text-sm text-maroon hover:underline">{expanded === order.id ? 'Less' : 'View'}</button>
              </div>
            </div>
            {expanded === order.id && (
              <div className="mt-4 border-t pt-4 text-sm">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-1">Items:</p>
                    {order.items?.map((item, i) => <p key={i} className="text-gray-600">{item.name} x {item.quantity} - ₹{item.total}</p>)}
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Shipping:</p>
                    <p className="text-gray-600">{order.shippingAddress?.fullName}<br />{order.shippingAddress?.street}, {order.shippingAddress?.city}<br />{order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  {statuses.filter(s => !['placed', 'cancelled'].includes(s) || s === order.orderStatus).map(s => (
                    <button key={s} onClick={() => updateStatus(order.id, s)} disabled={s === order.orderStatus} className="text-xs px-2 py-1 rounded border disabled:opacity-50">{s.replace(/_/g, ' ')}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {!loading && orders.length === 0 && <p className="text-center text-gray-500 py-8">No orders found.</p>}
      </div>
    </div>
  );
};

export default AdminOrders;
