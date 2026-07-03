import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { loadCustomers(); }, []);

  const loadCustomers = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      const { data } = await API.get('/admin/customers', { params });
      setCustomers(data.customers);
    } finally { setLoading(false); }
  };

  const toggleStatus = async (id) => {
    try { await API.put(`/admin/customers/${id}/toggle-status`); toast.success('Status toggled'); loadCustomers(); } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Customers</h1>
      <div className="relative mb-4 max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && loadCustomers()} className="input-field pl-10" />
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">Joined</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Action</th></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone || '-'}</td>
                  <td className="p-3">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">{c.isActive ? <span className="badge bg-green-100 text-green-700">Active</span> : <span className="badge bg-red-100 text-red-700">Blocked</span>}</td>
                  <td className="p-3">
                    <button onClick={() => toggleStatus(c.id)} className={`text-sm px-3 py-1 rounded ${c.isActive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                      {c.isActive ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
