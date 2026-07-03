import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import { FiTruck, FiChevronLeft, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/orders/${orderId}`).then(({ data }) => setOrder(data.order)).catch(() => navigate('/orders')).finally(() => setLoading(false));
  }, [orderId]);

  const handleCancel = async () => {
    const reason = prompt('Reason for cancellation:');
    if (!reason) return;
    try {
      await API.put(`/orders/${orderId}/cancel`, { reason });
      toast.success('Order cancelled');
      const { data } = await API.get(`/orders/${orderId}`);
      setOrder(data.order);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot cancel');
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-8"><div className="skeleton h-64 rounded-xl" /></div>;
  if (!order) return null;

  const statusSteps = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];
  const currentStep = statusSteps.indexOf(order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/orders" className="inline-flex items-center text-maroon hover:underline mb-4"><FiChevronLeft className="mr-1" /> Back to Orders</Link>
      <div className="card p-6 mb-6">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Order #{order.orderId}</h1>
            <p className="text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>{order.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}</p>
            <p className="text-sm text-gray-500">₹{order.total}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= currentStep ? 'bg-maroon text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {i < currentStep ? '✓' : <FiTruck size={14} />}
                </div>
                <span className="text-xs mt-1 capitalize">{step.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded" />
            <div className="absolute top-0 left-0 h-1 bg-maroon rounded transition-all" style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }} />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-bold mb-2">Items</h3>
          {order.items?.map((item, i) => (
            <div key={i} className="flex items-center space-x-3 py-2 border-b last:border-0">
              <img src={item.image || 'https://via.placeholder.com/48'} alt="" className="w-12 h-12 object-cover rounded" />
              <div className="flex-1"><Link to={`/product/${item.slug}`} className="font-medium hover:text-maroon">{item.name}</Link><p className="text-xs text-gray-500">Qty: {item.quantity} x ₹{item.price}</p></div>
              <p className="font-semibold">₹{item.total}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-1">Delivery Address</h3>
            <p className="text-sm text-gray-600">{order.shippingAddress?.fullName}<br />{order.shippingAddress?.street}, {order.shippingAddress?.city}<br />{order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
          </div>
          <div>
            <h3 className="font-bold mb-1">Price Breakdown</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
              {order.couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{order.couponDiscount}</span></div>}
              <div className="flex justify-between"><span>Delivery</span><span>{order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span></div>
              <div className="flex justify-between"><span>GST</span><span>₹{order.gst}</span></div>
              <hr />
              <div className="flex justify-between font-bold"><span>Total</span><span>₹{order.total}</span></div>
            </div>
          </div>
        </div>

        {['placed', 'confirmed'].includes(order.orderStatus) && (
          <button onClick={handleCancel} className="btn-outline text-red-500 border-red-300 hover:bg-red-50 mt-4">
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
