import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', displayOrder: 0 });

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data.categories);
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await API.put(`/categories/${editing}`, form);
        toast.success('Category updated');
      } else {
        await API.post('/categories', form);
        toast.success('Category created');
      }
      setShowForm(false);
      setEditing(null);
      setForm({ name: '', description: '', displayOrder: 0 });
      loadCategories();
    } catch (err) { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try { await API.delete(`/categories/${id}`); toast.success('Deleted'); loadCategories(); } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Categories</h1>
        <button onClick={() => { setEditing(null); setForm({ name: '', description: '', displayOrder: 0 }); setShowForm(true); }} className="btn-primary flex items-center space-x-1"><FiPlus /> <span>Add Category</span></button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 max-w-lg">
            <input required placeholder="Category Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field col-span-2" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field col-span-2" />
            <input type="number" placeholder="Display Order" value={form.displayOrder} onChange={e => setForm({ ...form, displayOrder: e.target.value })} className="input-field" />
            <div className="col-span-2 flex space-x-2">
              <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-3">
        {categories.map(cat => (
          <div key={cat.id} className="card p-4 flex items-center justify-between">
            <div><p className="font-semibold">{cat.name}</p><p className="text-sm text-gray-500">{cat.description}</p></div>
            <div className="flex space-x-2">
              <button onClick={() => { setEditing(cat.id); setForm({ name: cat.name, description: cat.description || '', displayOrder: cat.displayOrder }); setShowForm(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><FiEdit2 /></button>
              <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
