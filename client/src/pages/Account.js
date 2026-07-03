import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../utils/axios';
import { setUser } from '../store/authSlice';
import { FiUser, FiPackage, FiHeart, FiMapPin, FiLogOut, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Account = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await API.put('/auth/profile', { name, phone });
      dispatch(setUser(data.user));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
    setSaving(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) { toast.error('Fill all fields'); return; }
    setSaving(true);
    try {
      await API.put('/auth/change-password', { currentPassword, newPassword });
      toast.success('Password changed');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
    setSaving(false);
  };

  const sidebarLinks = [
    { to: '/account', icon: <FiUser />, label: 'Profile' },
    { to: '/orders', icon: <FiPackage />, label: 'Orders' },
    { to: '/wishlist', icon: <FiHeart />, label: 'Wishlist' },
    { to: '/addresses', icon: <FiMapPin />, label: 'Addresses' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-6">My Account</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card p-4 space-y-1">
            {sidebarLinks.map(link => (
              <Link key={link.to} to={link.to} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-cream transition-colors">
                {link.icon} <span>{link.label}</span>
              </Link>
            ))}
            <hr />
            <button className="flex items-center space-x-2 p-3 rounded-lg hover:bg-cream text-red-500 w-full">
              <FiLogOut /> <span>Logout</span>
            </button>
          </div>
        </div>
        <div className="md:col-span-3 space-y-6">
          <div className="card p-6">
            <h2 className="font-heading font-bold text-xl mb-4">Profile Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={user?.email || ''} className="input-field bg-gray-100" disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="input-field" />
              </div>
              <button type="submit" disabled={saving} className="btn-primary flex items-center space-x-2"><FiSave /> <span>{saving ? 'Saving...' : 'Save Changes'}</span></button>
            </form>
          </div>

          <div className="card p-6">
            <h2 className="font-heading font-bold text-xl mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-field" minLength={6} />
              </div>
              <button type="submit" disabled={saving} className="btn-secondary">{saving ? 'Updating...' : 'Change Password'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
