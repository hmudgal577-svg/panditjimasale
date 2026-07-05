import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import { FiTruck, FiChevronLeft, FiPackage, FiCheckCircle, FiMapPin, FiPhone, FiX, FiClock, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/image';

const STATUS_CONFIG = [
  { key: 'placed', label: 'Order Placed', icon: FiShoppingBag, desc: 'We received your order' },
  { key: 'confirmed', label: 'Confirmed', icon: FiCheckCircle, desc: 'Order verified & packed' },
  { key: 'shipped', label: 'Shipped', icon: FiPackage, desc: 'On the way to you' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: FiTruck, desc: 'Arriving today' },
  { key: 'delivered', label: 'Delivered', icon: FiMapPin, desc: 'Package delivered' },
];

const statusColors = {
  placed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
  confirmed: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700' },
  shipped: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  out_for_delivery: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700' },
  delivered: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/orders/${orderId}`)
      .then(({ data }) => setOrder(data.order))
      .catch(() => navigate('/orders'))
      .finally(() => setLoading(false));
  }, [orderId, navigate]);

  const handleCancel = async () => {
    const reason = prompt('Reason for cancellation (optional):') ?? '';
    try {
      await API.put(`/orders/${orderId}/cancel`, { reason });
      toast.success('Order cancelled successfully');
      const { data } = await API.get(`/orders/${orderId}`);
      setOrder(data.order);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot cancel this order');
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <div className="skeleton h-8 w-40 rounded-lg" />
      <div className="skeleton h-64 rounded-2xl" />
      <div className="skeleton h-48 rounded-2xl" />
    </div>
  );
  if (!order) return null;

  const isCancelled = order.orderStatus === 'cancelled';
  const currentStep = isCancelled ? -1 : STATUS_CONFIG.findIndex(s => s.key === order.orderStatus);
  const colors = statusColors[order.orderStatus] || statusColors.placed;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link to="/orders" className="inline-flex items-center text-maroon hover:underline mb-6 font-medium">
        <FiChevronLeft className="mr-1" /> Back to My Orders
      </Link>

      {/* Header Card */}
      <div className={`rounded-2xl border-2 p-6 mb-6 ${colors.bg} ${colors.border}`}>
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <h1 className="text-2xl font-heading font-bold text-darkbrown">#{order.orderId}</h1>
            <p className="text-sm text-gray-500 mt-1">
              <FiClock className="inline mr-1" />
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${colors.badge}`}>
              {isCancelled ? '❌ Cancelled' : order.orderStatus?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <p className="text-2xl font-bold text-darkbrown mt-2">₹{order.total}</p>
            <p className={`text-sm font-medium mt-1 ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
              {order.paymentStatus === 'paid' ? '✅ Paid' : '🕐 Payment Pending (COD)'}
            </p>
          </div>
        </div>

        {/* Estimated Delivery */}
        {!isCancelled && order.orderStatus !== 'delivered' && order.estimatedDelivery && (
          <div className="mt-4 flex items-center gap-2 bg-white/70 rounded-xl px-4 py-3 border border-white/50">
            <FiTruck className={`${colors.text} flex-shrink-0`} size={18} />
            <span className="text-sm font-medium text-gray-700">
              Estimated delivery: <span className={`font-bold ${colors.text}`}>{new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </span>
          </div>
        )}
        {order.orderStatus === 'delivered' && (
          <div className="mt-4 flex items-center gap-2 bg-green-100 rounded-xl px-4 py-3">
            <FiCheckCircle className="text-green-600" size={18} />
            <span className="text-sm font-bold text-green-700">Your order has been delivered! 🎉</span>
          </div>
        )}
      </div>

      {/* Order Status Tracker */}
      {!isCancelled && (
        <div className="card p-6 mb-6">
          <h2 className="font-heading font-bold text-xl text-darkbrown mb-6">Order Tracking</h2>
          <div className="relative">
            {/* Progress bar background */}
            <div className="absolute top-5 left-5 right-5 h-1 bg-gray-100 rounded-full hidden md:block" />
            {/* Active progress bar */}
            {currentStep >= 0 && (
              <div
                className="absolute top-5 left-5 h-1 bg-maroon rounded-full hidden md:block transition-all duration-500"
                style={{ width: `calc(${(currentStep / (STATUS_CONFIG.length - 1)) * 100}% - ${currentStep === STATUS_CONFIG.length - 1 ? '20px' : '0px'})` }}
              />
            )}
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
              {STATUS_CONFIG.map((step, i) => {
                const isDone = i < currentStep;
                const isCurrent = i === currentStep;
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm
                      ${isDone ? 'bg-maroon text-white shadow-maroon/30' :
                        isCurrent ? 'bg-maroon text-white ring-4 ring-maroon/20 shadow-maroon/30 scale-110' :
                          'bg-gray-100 text-gray-400'}`}>
                      {isDone ? <span className="text-base">✓</span> : <Icon size={16} />}
                    </div>
                    <div className="md:text-center">
                      <p className={`text-xs font-bold ${isDone || isCurrent ? 'text-darkbrown' : 'text-gray-400'}`}>{step.label}</p>
                      <p className="text-xs text-gray-400 hidden md:block">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Items */}
        <div className="card p-6">
          <h2 className="font-heading font-bold text-lg text-darkbrown mb-4">
            <FiShoppingBag className="inline mr-2 text-maroon" />Items ({order.items?.length})
          </h2>
          <div className="space-y-3">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <img
                  src={getImageUrl(item.image) || 'https://via.placeholder.com/48'}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-xl border border-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.slug}`} className="font-medium text-sm text-darkbrown hover:text-maroon line-clamp-1">{item.name}</Link>
                  {item.weight && <p className="text-xs text-gray-400">{item.weight}</p>}
                  <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                </div>
                <p className="font-bold text-darkbrown text-sm flex-shrink-0">₹{item.total}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Price Breakdown */}
          <div className="card p-6">
            <h2 className="font-heading font-bold text-lg text-darkbrown mb-4">Price Breakdown</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-medium">₹{order.subtotal}</span></div>
              {order.couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>Coupon Discount</span><span>-₹{order.couponDiscount}</span></div>}
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className={order.deliveryCharge === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                  {order.deliveryCharge === 0 ? 'FREE 🎉' : `₹${order.deliveryCharge}`}
                </span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between font-bold text-base text-darkbrown">
                <span>Total Paid</span>
                <span className="text-maroon">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="card p-6">
            <h2 className="font-heading font-bold text-lg text-darkbrown mb-3">
              <FiMapPin className="inline mr-2 text-maroon" />Delivery Address
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-darkbrown">{order.shippingAddress?.fullName}</p>
              <p className="flex items-center gap-1"><FiPhone size={12} className="text-gray-400" />{order.shippingAddress?.phone}</p>
              <p>{order.shippingAddress?.street}{order.shippingAddress?.area ? `, ${order.shippingAddress.area}` : ''}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.pincode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {['placed', 'confirmed'].includes(order.orderStatus) && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
          >
            <FiX size={16} /> Cancel Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
