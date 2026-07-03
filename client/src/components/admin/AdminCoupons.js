import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', description: '', type: 'percentage', value: '', minOrderValue: 0, maxDiscount: '', usageLimit: 100, expiresAt: '' });

  useEffect(() => { loadCoupons(); }, []);

  const loadCoupons = async () => {
    try {
      const { data } = await API.get('/coupons');
      setCoupons(data.coupons);
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/coupons', form);
      toast.success('Coupon created');
      setShowForm(false);
      setForm({ code: '', description: '', type: 'percentage', value: '', minOrderValue: 0, maxDiscount: '', usageLimit: 100, expiresAt: '' });
      loadCoupons();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this coupon?')) return;
    try { await API.delete(`/coupons/${id}`); toast.success('Deleted'); loadCoupons(); } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Coupons</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-1"><FiPlus /> <span>Create Coupon</span></button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 max-w-lg">
            <input required placeholder="Coupon Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} className="input-field" />
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="input-field">
              <option value="percentage">Percentage</option>
              <option value="flat">Flat Amount</option>
            </select>
            <input required type="number" placeholder="Value" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} className="input-field" />
            <input type="number" placeholder="Min Order Value" value={form.minOrderValue} onChange={e => setForm({ ...form, minOrderValue: e.target.value })} className="input-field" />
            <input type="number" placeholder="Max Discount" value={form.maxDiscount} onChange={e => setForm({ ...form, maxDiscount: e.target.value })} className="input-field" />
            <input type="number" placeholder="Usage Limit" value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: e.target.value })} className="input-field" />
            <input type="date" placeholder="Expiry Date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} className="input-field col-span-2" />
            <div className="col-span-2 flex space-x-2">
              <button type="submit" className="btn-primary">Create</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-3">
        {coupons.map(c => (
          <div key={c.id} className="card p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-maroon">{c.code}</p>
              <p className="text-sm text-gray-600">{c.type === 'percentage' ? `${c.value}% off` : `₹${c.value} off`} {c.minOrderValue > 0 && `(Min: ₹${c.minOrderValue})`}</p>
              <p className="text-xs text-gray-400">Used: {c.usedCount}/{c.usageLimit} • Expires: {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : 'Never'}</p>
            </div>
            <div className="flex items-center space-x-3">
              {c.isActive ? <span className="badge bg-green-100 text-green-700">Active</span> : <span className="badge bg-red-100 text-red-700">Inactive</span>}
              <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCoupons;
