import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import API from '../utils/axios';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/admin-login', { email, password });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(setUser(data.user));
      toast.success('Welcome Admin!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-darkbrown flex items-center justify-center px-4">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-gold font-heading font-bold text-2xl">PJ</span>
          </div>
          <h1 className="text-2xl font-heading font-bold">Admin Login</h1>
          <p className="text-gray-500 text-sm">Pandit Ji Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="Admin Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" placeholder="Password" required />
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Verifying...' : 'Sign In as Admin'}</button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">Demo: admin@panditji.com / admin123</p>
      </div>
    </div>
  );
};

export default AdminLogin;
