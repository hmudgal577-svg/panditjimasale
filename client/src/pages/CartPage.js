import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCartLocal, updateCartLocal } from '../store/cartSlice';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { items, itemCount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal >= 499 ? 0 : 40;
  const gst = subtotal * 0.05;
  const total = Math.max(0, subtotal - couponDiscount + deliveryCharge + gst);

  const handleQuantity = (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      dispatch(removeFromCartLocal(item.id));
      toast.success('Removed from cart');
    } else {
      dispatch(updateCartLocal({ id: item.id, quantity: newQty }));
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'PANDIT10') {
      setCouponDiscount(Math.min(subtotal * 0.1, 200));
      setCouponError('');
      toast.success('Coupon applied!');
    } else if (couponCode.toUpperCase() === 'FIRST50') {
      setCouponDiscount(50);
      setCouponError('');
      toast.success('Coupon applied!');
    } else {
      setCouponError('Invalid coupon code');
      setCouponDiscount(0);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-3xl font-heading font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
        <Link to="/shop" className="btn-primary inline-flex items-center"><FiArrowLeft className="mr-2" /> Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-2">Shopping Cart</h1>
      <p className="text-gray-500 mb-6">{itemCount} items in your cart</p>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="card p-4 flex items-center space-x-4">
              <Link to={`/product/${item.slug}`} className="w-20 h-20 flex-shrink-0">
                <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.slug}`} className="font-semibold hover:text-maroon line-clamp-1">{item.name}</Link>
                {item.weight && <p className="text-sm text-gray-500">{item.weight}</p>}
                <p className="text-maroon font-bold mt-1">₹{item.price}</p>
              </div>
              <div className="flex items-center border-2 rounded-lg">
                <button onClick={() => handleQuantity(item, -1)} className="p-1.5 hover:bg-cream"><FiMinus size={14} /></button>
                <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                <button onClick={() => handleQuantity(item, 1)} className="p-1.5 hover:bg-cream"><FiPlus size={14} /></button>
              </div>
              <p className="font-bold text-lg w-20 text-right">₹{item.price * item.quantity}</p>
              <button onClick={() => { dispatch(removeFromCartLocal(item.id)); toast.success('Removed'); }} className="p-2 text-gray-400 hover:text-red-500"><FiTrash2 /></button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-heading font-bold text-xl mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{deliveryCharge === 0 ? <span className="text-green-600 font-medium">FREE</span> : `₹${deliveryCharge}`}</span></div>
              {couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>Coupon Discount</span><span>-₹{couponDiscount.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span>GST (5%)</span><span>₹{gst.toFixed(2)}</span></div>
              <hr />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-maroon">₹{total.toFixed(2)}</span></div>
            </div>

            <div className="mt-4">
              <div className="flex space-x-2">
                <input type="text" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="input-field text-sm flex-1" />
                <button onClick={handleApplyCoupon} className="btn-outline text-sm py-1.5">Apply</button>
              </div>
              {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
              <p className="text-xs text-gray-500 mt-1">Try: PANDIT10, FIRST50</p>
            </div>

            <Link to="/checkout" className="btn-primary w-full text-center mt-6 block">Proceed to Checkout</Link>
            <Link to="/shop" className="block text-center mt-3 text-sm text-maroon hover:underline">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
