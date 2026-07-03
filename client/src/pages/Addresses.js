import React, { useEffect, useState } from 'react';
import API from '../utils/axios';
import { FiPlus, FiTrash2, FiEdit2, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ fullName: '', phone: '', street: '', area: '', city: '', state: '', pincode: '', addressType: 'home', isDefault: false });

  useEffect(() => { loadAddresses(); }, []);

  const loadAddresses = async () => {
    try {
      const { data } = await API.get('/address');
      setAddresses(data.addresses);
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setForm({ fullName: '', phone: '', street: '', area: '', city: '', state: '', pincode: '', addressType: 'home', isDefault: false });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/address/${editing}`, form);
        toast.success('Address updated');
      } else {
        await API.post('/address', form);
        toast.success('Address added');
      }
      resetForm();
      loadAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await API.delete(`/address/${id}`);
      toast.success('Address deleted');
      loadAddresses();
    } catch { toast.error('Failed to delete'); }
  };

  const handleEdit = (addr) => {
    setForm({ fullName: addr.fullName, phone: addr.phone, street: addr.street, area: addr.area || '', city: addr.city, state: addr.state, pincode: addr.pincode, addressType: addr.addressType, isDefault: addr.isDefault });
    setEditing(addr.id);
    setShowForm(true);
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-8"><div className="skeleton h-40 rounded-xl" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading font-bold">My Addresses</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary flex items-center space-x-1"><FiPlus /> <span>Add New</span></button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <h2 className="font-heading font-bold text-lg mb-4">{editing ? 'Edit Address' : 'New Address'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            <input required placeholder="Full Name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} className="input-field col-span-2" />
            <input required placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-field" />
            <input placeholder="Area" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} className="input-field" />
            <input required placeholder="Street Address" value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} className="input-field col-span-2" />
            <input required placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="input-field" />
            <input required placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="input-field" />
            <input required placeholder="Pincode" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} className="input-field" />
            <select value={form.addressType} onChange={e => setForm({ ...form, addressType: e.target.value })} className="input-field">
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
            <label className="flex items-center cursor-pointer"><input type="checkbox" checked={form.isDefault} onChange={e => setForm({ ...form, isDefault: e.target.checked })} className="mr-2" /> Set as default</label>
            <div className="col-span-2 flex space-x-2">
              <button type="submit" className="btn-primary">{editing ? 'Update' : 'Save'}</button>
              <button type="button" onClick={resetForm} className="btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {addresses.map(addr => (
          <div key={addr.id} className="card p-4 flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <FiMapPin className="mt-1 text-maroon" />
              <div>
                <p className="font-semibold">{addr.fullName} - {addr.phone} {addr.isDefault && <span className="badge bg-maroon/10 text-maroon text-xs ml-2">Default</span>}</p>
                <p className="text-sm text-gray-600">{addr.street}{addr.area ? `, ${addr.area}` : ''}</p>
                <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                <span className="text-xs text-gray-400 capitalize">{addr.addressType}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(addr)} className="p-2 text-gray-400 hover:text-maroon"><FiEdit2 /></button>
              <button onClick={() => handleDelete(addr.id)} className="p-2 text-gray-400 hover:text-red-500"><FiTrash2 /></button>
            </div>
          </div>
        ))}
        {addresses.length === 0 && !showForm && <p className="text-center text-gray-500 py-8">No addresses saved yet.</p>}
      </div>
    </div>
  );
};

export default Addresses;
