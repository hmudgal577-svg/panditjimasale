import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { items } = useSelector(state => state.cart);
  const navigate = useNavigate();
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery
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
      .catch(() => {
        toast.error('Failed to load addresses');
      })
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
      toast.success('Address added successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  const loadRazorpayScript = () => new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }
    setPlacing(true);

    try {
      // 1. Create the order in backend
      const { data: orderData } = await API.post('/orders', {
        addressId: selectedAddress,
        paymentMethod: paymentMethod
      });

      // 2. Handle Cash on Delivery (COD) Flow
      if (paymentMethod === 'cod') {
        toast.success('Order placed successfully! (Cash on Delivery)');
        navigate(`/orders/${orderData.order.orderId}`);
        return;
      }

      // 3. Handle Razorpay Online Payment Flow
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway. Please use COD or try again.');
        setPlacing(false);
        return;
      }

      // Create Razorpay Order
      let paymentData;
      try {
        const res = await API.post('/payment/create-order', { orderId: orderData.order.orderId });
        paymentData = res.data;
      } catch (err) {
        // If razorpay keys are invalid/missing, help the user understand
        toast.error('Razorpay keys are currently not configured on server. Please use Cash on Delivery (COD) to place your order.');
        setPlacing(false);
        return;
      }

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'Pandit Ji Masale',
        description: `Order ${orderData.order.orderId}`,
        order_id: paymentData.razorpayOrderId,
        handler: async (response) => {
          try {
            await API.post('/payment/verify', {
              orderId: orderData.order.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });
            toast.success('Payment successful!');
            navigate(`/orders/${orderData.order.orderId}`);
          } catch {
            toast.error('Payment verification failed. Please contact support.');
            navigate('/orders');
          }
        },
        modal: {
          ondismiss: () => {
            setPlacing(false);
            toast.error('Payment cancelled');
          }
        },
        prefill: {
          name: orderData.order.shippingAddress.fullName,
          email: '',
          contact: orderData.order.shippingAddress.phone
        },
        theme: { color: '#7A1E1E' }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        toast.error('Payment failed. Please try again.');
        setPlacing(false);
      });
      rzp.open();

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-6 text-darkbrown">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Delivery Address */}
          <div className="card p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="font-heading font-bold text-lg mb-4 text-darkbrown">Delivery Address</h2>
            {loading ? (
              <div className="skeleton h-20 w-full" />
            ) : addresses.length === 0 && !showAddressForm ? (
              <p className="text-gray-500 mb-4">No saved addresses. Please add one to continue.</p>
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
                      <p className="text-sm text-gray-500 mt-1">{addr.street}, {addr.area ? `${addr.area}, ` : ''}{addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            {!showAddressForm ? (
              <button onClick={() => setShowAddressForm(true)} className="btn-outline text-sm mt-4">+ Add New Address</button>
            ) : (
              <form onSubmit={handleAddAddress} className="mt-4 grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-150">
                <input required placeholder="Full Name" value={newAddress.fullName} onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })} className="input-field col-span-2" />
                <input required placeholder="Phone Number" value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} className="input-field" />
                <input placeholder="Landmark / Area (Optional)" value={newAddress.area} onChange={e => setNewAddress({ ...newAddress, area: e.target.value })} className="input-field" />
                <input required placeholder="Street Address" value={newAddress.street} onChange={e => setNewAddress({ ...newAddress, street: e.target.value })} className="input-field col-span-2" />
                <input required placeholder="City" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} className="input-field" />
                <input required placeholder="State" value={newAddress.state} onChange={e => setNewAddress({ ...newAddress, state: e.target.value })} className="input-field" />
                <input required placeholder="Pincode" value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} className="input-field" />
                <select value={newAddress.addressType} onChange={e => setNewAddress({ ...newAddress, addressType: e.target.value })} className="input-field">
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
                <div className="col-span-2 flex space-x-2 mt-2">
                  <button type="submit" className="btn-primary py-2 px-4 text-sm">Save & Select</button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="btn-outline py-2 px-4 text-sm">Cancel</button>
                </div>
              </form>
            )}
          </div>

          {/* Order Items */}
          <div className="card p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="font-heading font-bold text-lg mb-4 text-darkbrown">Order Items</h2>
            <div className="divide-y divide-gray-100">
              {items.map(item => (
                <div key={item.id} className="flex items-center space-x-3 py-3 last:pb-0 first:pt-0">
                  <img src={item.image || 'https://via.placeholder.com/48'} alt="" className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-darkbrown">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.weight ? `Weight: ${item.weight} | ` : ''}Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-darkbrown">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 bg-white border border-gray-100 rounded-2xl shadow-sm sticky top-24 space-y-6">
            <h2 className="font-heading font-bold text-xl text-darkbrown">Order Summary</h2>
            <div className="space-y-2.5 text-sm text-gray-600">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-darkbrown">₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{deliveryCharge === 0 ? <span className="text-green-600 font-medium">FREE</span> : `₹${deliveryCharge}`}</span></div>
              <div className="flex justify-between"><span>GST (5%)</span><span className="font-medium text-darkbrown">₹{gst.toFixed(2)}</span></div>
              <hr className="border-gray-100" />
              <div className="flex justify-between font-bold text-lg text-darkbrown"><span>Total Amount</span><span className="text-maroon">₹{total.toFixed(2)}</span></div>
            </div>

            {/* Payment Selector */}
            <div className="space-y-2.5 pt-2">
              <h3 className="font-bold text-sm text-gray-700">Choose Payment Option:</h3>
              <label className={`flex items-start p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-maroon bg-maroon/2' : 'border-gray-200'}`}>
                <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="mt-1 mr-2 accent-maroon" />
                <div>
                  <div className="font-semibold text-sm text-darkbrown">Cash on Delivery (COD)</div>
                  <div className="text-xs text-gray-500 mt-0.5">Pay in cash or UPI when order reaches your door.</div>
                </div>
              </label>
              <label className={`flex items-start p-3 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-maroon bg-maroon/2' : 'border-gray-200'}`}>
                <input type="radio" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="mt-1 mr-2 accent-maroon" />
                <div>
                  <div className="font-semibold text-sm text-darkbrown">Pay Online (Razorpay)</div>
                  <div className="text-xs text-gray-500 mt-0.5">Secure payment via UPI, Credit/Debit Cards, NetBanking.</div>
                </div>
              </label>
            </div>

            <button onClick={handlePlaceOrder} disabled={placing || !selectedAddress} className="btn-primary w-full py-3.5 font-bold shadow-md hover:shadow-lg transition-all">
              {placing ? 'Processing...' : paymentMethod === 'cod' ? `Place Order (COD) — ₹${total.toFixed(2)}` : `Pay Online — ₹${total.toFixed(2)}`}
            </button>
            <p className="text-xxs text-gray-400 text-center">By placing your order you agree to our Terms and Conditions.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
