import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import toast from 'react-hot-toast';
import { FiTruck, FiMapPin, FiShoppingBag, FiCheckCircle } from 'react-icons/fi';

const Checkout = () => {
  const { items } = useSelector(state => state.cart);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home'
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal >= 499 ? 0 : 40;
  const gst = subtotal * 0.05;
  const total = Math.max(0, subtotal + deliveryCharge + gst);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    API.get('/address')
      .then(({ data }) => {
        setAddresses(data.addresses);
        const defaultAddr = data.addresses.find(a => a.isDefault) || data.addresses[0];
        if (defaultAddr) setSelectedAddress(defaultAddr.id);
      })
      .catch(() => toast.error('Failed to load addresses'))
      .finally(() => setLoading(false));
  }, [items, navigate]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/address', newAddress);
      setAddresses(prev => [...prev, data.address]);
      setSelectedAddress(data.address.id);
      setShowAddressForm(false);
      setNewAddress({ fullName: '', phone: '', street: '', area: '', city: '', state: '', pincode: '', addressType: 'home' });
      toast.success('Address added!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }
    setPlacing(true);
    try {
      const { data: orderData } = await API.post('/orders', {
        addressId: selectedAddress,
        paymentMethod: 'cod'
      });
      toast.success('🎉 Order placed successfully! Pay when it arrives.');
      navigate(`/orders/${orderData.order.orderId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order. Please try again.');
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-darkbrown">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Delivery Address */}
          <div className="card p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="font-heading font-bold text-lg mb-4 text-darkbrown flex items-center gap-2">
              <FiMapPin className="text-maroon" /> Delivery Address
            </h2>
            {loading ? (
              <div className="skeleton h-20 w-full rounded-xl" />
            ) : addresses.length === 0 && !showAddressForm ? (
              <p className="text-gray-500 mb-4 text-sm">No saved addresses. Please add one to continue.</p>
            ) : null}

            <div className="space-y-3">
              {addresses.map(addr => (
                <label key={addr.id} className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr.id ? 'border-maroon bg-maroon/5' : 'border-gray-100 hover:border-gray-300'}`}>
                  <input type="radio" name="address" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} className="hidden" />
                  <div className="flex items-start">
                    <div className={`w-4 h-4 mt-1 rounded-full border-2 flex-shrink-0 mr-3 flex items-center justify-center ${selectedAddress === addr.id ? 'border-maroon' : 'border-gray-300'}`}>
                      {selectedAddress === addr.id && <div className="w-2.5 h-2.5 bg-maroon rounded-full" />}
                    </div>
                    <div>
                      <p className="font-semibold text-darkbrown">{addr.fullName} — {addr.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">{addr.street}{addr.area ? `, ${addr.area}` : ''}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      <span className="text-xs bg-cream text-gray-500 px-2 py-0.5 rounded mt-1 inline-block capitalize">{addr.addressType}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {!showAddressForm ? (
              <button onClick={() => setShowAddressForm(true)} className="btn-outline text-sm mt-4">+ Add New Address</button>
            ) : (
              <form onSubmit={handleAddAddress} className="mt-4 grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <input required placeholder="Full Name" value={newAddress.fullName} onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })} className="input-field col-span-2" />
                <input required placeholder="Phone Number" value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} className="input-field" />
                <input placeholder="Landmark / Area" value={newAddress.area} onChange={e => setNewAddress({ ...newAddress, area: e.target.value })} className="input-field" />
                <input required placeholder="Street Address" value={newAddress.street} onChange={e => setNewAddress({ ...newAddress, street: e.target.value })} className="input-field col-span-2" />
                <input required placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} className="input-field" />
                <input required placeholder="State" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} className="input-field" />
                <input required placeholder="Pincode" value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} className="input-field" />
                <select value={newAddress.addressType} onChange={e => setNewAddress({ ...newAddress, addressType: e.target.value })} className="input-field">
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
                <div className="col-span-2 flex space-x-2 mt-1">
                  <button type="submit" className="btn-primary py-2 px-4 text-sm">Save & Select</button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
                </div>
              </form>
            )}
          </div>

          {/* Order Items */}
          <div className="card p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="font-heading font-bold text-lg mb-4 text-darkbrown flex items-center gap-2">
              <FiShoppingBag className="text-maroon" /> Your Items ({items.length})
            </h2>
            <div className="divide-y divide-gray-100">
              {items.map(item => (
                <div key={item.id} className="flex items-center space-x-3 py-3 last:pb-0 first:pt-0">
                  <img src={item.image || 'https://via.placeholder.com/48'} alt={item.name} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-darkbrown">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.weight ? `${item.weight} | ` : ''}Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-darkbrown">₹{(item.price * item.quantity).toFixed(0)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method — COD Only */}
          <div className="card p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="font-heading font-bold text-lg mb-4 text-darkbrown flex items-center gap-2">
              <FiTruck className="text-maroon" /> Payment Method
            </h2>
            <div className="flex items-start p-4 rounded-xl border-2 border-maroon bg-maroon/5">
              <FiCheckCircle className="text-maroon mt-0.5 mr-3 flex-shrink-0" size={20} />
              <div>
                <p className="font-bold text-darkbrown">Cash on Delivery (COD)</p>
                <p className="text-sm text-gray-500 mt-1">Pay in cash or UPI when the order arrives at your doorstep. No advance payment needed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 bg-white border border-gray-100 rounded-2xl shadow-sm sticky top-24 space-y-5">
            <h2 className="font-heading font-bold text-xl text-darkbrown">Order Summary</h2>

            <div className="space-y-2.5 text-sm text-gray-600">
              <div className="flex justify-between"><span>Subtotal ({items.length} items)</span><span className="font-medium text-darkbrown">₹{subtotal.toFixed(0)}</span></div>
              <div className="flex justify-between"><span>Delivery Charges</span>
                <span>{deliveryCharge === 0
                  ? <span className="text-green-600 font-medium">FREE 🎉</span>
                  : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between"><span>GST (5%)</span><span className="font-medium text-darkbrown">₹{gst.toFixed(0)}</span></div>
              {subtotal > 0 && subtotal < 499 && (
                <p className="text-xs text-saffron bg-saffron/10 px-3 py-2 rounded-lg">Add ₹{(499 - subtotal).toFixed(0)} more for FREE delivery!</p>
              )}
              <hr className="border-gray-100" />
              <div className="flex justify-between font-bold text-lg text-darkbrown">
                <span>Total Amount</span>
                <span className="text-maroon">₹{total.toFixed(0)}</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
              <FiTruck className="text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-green-700 font-medium">Cash on Delivery — Pay when order arrives. Safe & easy!</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing || !selectedAddress || loading}
              className="btn-primary w-full py-4 font-bold text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {placing ? '⏳ Placing Order...' : `Place Order — ₹${total.toFixed(0)}`}
            </button>

            <p className="text-xs text-gray-400 text-center">By placing your order you agree to our Terms & Conditions.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
