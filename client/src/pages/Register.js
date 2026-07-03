import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/authSlice';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => { dispatch(clearError()); }, [dispatch]);
  useEffect(() => { if (error) toast.error(error); }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    dispatch(registerUser({ name: form.name, email: form.email, password: form.password, phone: form.phone }));
  };

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-gold font-heading font-bold text-2xl">PJ</span>
          </div>
          <h1 className="text-2xl font-heading font-bold">Create Account</h1>
          <p className="text-gray-500 text-sm">Join Pandit Ji family</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className="input-field pl-10" placeholder="Full Name" required />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="input-field pl-10" placeholder="Email" required />
          </div>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="input-field pl-10" placeholder="Phone (optional)" />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" value={form.password} onChange={e => update('password', e.target.value)} className="input-field pl-10" placeholder="Password (min 6 chars)" required minLength={6} />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} className="input-field pl-10" placeholder="Confirm Password" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Creating Account...' : 'Create Account'}</button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Already have an account? <Link to="/login" className="text-maroon font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
