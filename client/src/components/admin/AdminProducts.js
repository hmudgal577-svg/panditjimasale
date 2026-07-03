import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/image';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    discountPrice: '',
    categoryId: '',
    stock: '',
    isFeatured: false,
    isOrganic: false,
    weightOptions: []
  });
  const [newWeight, setNewWeight] = useState({ label: '', price: '' });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await API.get('/products', { params: { limit: 50 } });
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('discountPrice', form.discountPrice || '');
      formData.append('stock', form.stock);
      formData.append('categoryId', form.categoryId);
      formData.append('shortDescription', form.shortDescription || '');
      formData.append('description', form.description || '');
      formData.append('isFeatured', form.isFeatured);
      formData.append('isOrganic', form.isOrganic);
      formData.append('weightOptions', JSON.stringify(form.weightOptions || []));

      // Append new image files
      images.forEach((file) => {
        formData.append('images', file);
      });

      if (editing) {
        // Send list of remaining existing images
        formData.append('imagesList', JSON.stringify(existingImages));
        await API.put(`/products/${editing}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product updated');
      } else {
        await API.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product created');
      }
      setShowForm(false);
      setEditing(null);
      setForm({ name: '', description: '', shortDescription: '', price: '', discountPrice: '', categoryId: '', stock: '', isFeatured: false, isOrganic: false, weightOptions: [] });
      setNewWeight({ label: '', price: '' });
      setImages([]);
      setExistingImages([]);
      loadProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit form');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deactivated');
      loadProducts();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-darkbrown">Products</h1>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ name: '', description: '', shortDescription: '', price: '', discountPrice: '', categoryId: '', stock: '', isFeatured: false, isOrganic: false, weightOptions: [] });
            setNewWeight({ label: '', price: '' });
            setImages([]);
            setExistingImages([]);
            setShowForm(true);
          }}
          className="btn-primary flex items-center space-x-1"
        >
          <FiPlus /> <span>Add Product</span>
        </button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <h2 className="font-heading font-bold text-lg mb-4 text-darkbrown">{editing ? 'Edit Product' : 'New Product'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-darkbrown mb-1">Product Name *</label>
              <input required placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field w-full" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-darkbrown mb-1">Price (₹) *</label>
              <input required placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="input-field w-full" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-darkbrown mb-1">Discount Price (₹)</label>
              <input placeholder="Discount Price" type="number" value={form.discountPrice} onChange={e => setForm({ ...form, discountPrice: e.target.value })} className="input-field w-full" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-darkbrown mb-1">Stock *</label>
              <input required placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="input-field w-full" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-darkbrown mb-1">Category *</label>
              <select
                required
                value={form.categoryId}
                onChange={e => setForm({ ...form, categoryId: e.target.value })}
                className="input-field w-full bg-white"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-darkbrown mb-1">Short Description</label>
              <textarea placeholder="Short Description" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className="input-field w-full" rows={2} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-darkbrown mb-1">Detailed Description</label>
              <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field w-full" rows={3} />
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <label className="block text-sm font-semibold text-darkbrown mb-2">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => setImages(Array.from(e.target.files))}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cream file:text-maroon hover:file:bg-cream-dark cursor-pointer"
              />
              
              {/* Newly selected images list */}
              {images.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  <span className="font-semibold text-darkbrown">Selected for upload:</span> {images.map(f => f.name).join(', ')}
                </div>
              )}

              {/* Existing images view & manage */}
              {editing && existingImages.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-darkbrown block mb-2">Existing Images (Hover/Click to remove):</span>
                  <div className="flex flex-wrap gap-3">
                    {existingImages.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-cream shadow-sm group">
                        <img src={img} alt="Product" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setExistingImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Weight options pricing manager */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <label className="block text-sm font-semibold text-darkbrown mb-2">Weight Options (e.g. 100g, 250g, 1kg) & Custom Prices</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Weight (e.g. 250g)"
                  value={newWeight.label}
                  onChange={e => setNewWeight({ ...newWeight, label: e.target.value })}
                  className="input-field flex-1"
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={newWeight.price}
                  onChange={e => setNewWeight({ ...newWeight, price: e.target.value })}
                  className="input-field w-32"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newWeight.label || !newWeight.price) {
                      toast.error('Both label and price are required');
                      return;
                    }
                    setForm(prev => ({
                      ...prev,
                      weightOptions: [...(prev.weightOptions || []), { label: newWeight.label, price: parseFloat(newWeight.price) }]
                    }));
                    setNewWeight({ label: '', price: '' });
                  }}
                  className="btn-primary py-2 px-4 text-sm"
                >
                  Add Option
                </button>
              </div>

              {form.weightOptions && form.weightOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.weightOptions.map((opt, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream text-maroon rounded-full text-sm font-medium border border-cream shadow-sm">
                      {opt.label}: ₹{opt.price}
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({
                          ...prev,
                          weightOptions: prev.weightOptions.filter((_, i) => i !== idx)
                        }))}
                        className="text-red-600 hover:text-red-800 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex space-x-4 border-t pt-4 mt-2">
              <label className="flex items-center text-sm font-semibold text-darkbrown cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="mr-2 rounded text-maroon focus:ring-maroon" /> Featured Product
              </label>
              <label className="flex items-center text-sm font-semibold text-darkbrown cursor-pointer">
                <input type="checkbox" checked={form.isOrganic} onChange={e => setForm({ ...form, isOrganic: e.target.checked })} className="mr-2 rounded text-maroon focus:ring-maroon" /> Organic Range
              </label>
            </div>

            <div className="md:col-span-2 flex space-x-2 border-t pt-4 mt-2">
              <button type="submit" className="btn-primary">{editing ? 'Update Product' : 'Create Product'}</button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  setNewWeight({ label: '', price: '' });
                  setImages([]);
                  setExistingImages([]);
                }}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 text-left font-semibold text-darkbrown">Product Name</th>
                <th className="p-3 text-left font-semibold text-darkbrown">Price</th>
                <th className="p-3 text-left font-semibold text-darkbrown">Stock</th>
                <th className="p-3 text-left font-semibold text-darkbrown">Featured</th>
                <th className="p-3 text-left font-semibold text-darkbrown">Active</th>
                <th className="p-3 text-left font-semibold text-darkbrown">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t hover:bg-cream/20">
                  <td className="p-3 font-medium text-darkbrown">
                    <div className="flex items-center space-x-3">
                      {p.images && p.images[0] && (
                        <img src={getImageUrl(p.images[0])} alt="" className="w-10 h-10 object-cover rounded-md border border-cream shadow-sm" />
                      )}
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-maroon">₹{p.discountPrice || p.price}</td>
                  <td className="p-3">
                    <span className={p.stock <= 10 ? 'text-red-600 font-bold' : 'text-gray-600'}>
                      {p.stock} {p.stock <= 10 && '(Low)'}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{p.isFeatured ? '✓' : '-'}</td>
                  <td className="p-3">
                    {p.isActive ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditing(p.id);
                          setForm({
                            name: p.name,
                            description: p.description || '',
                            shortDescription: p.shortDescription || '',
                            price: p.price,
                            discountPrice: p.discountPrice || '',
                           categoryId: p.categoryId,
                            stock: p.stock,
                            isFeatured: p.isFeatured,
                            isOrganic: p.isOrganic,
                            weightOptions: p.weightOptions || []
                          });
                          setExistingImages(p.images || []);
                          setImages([]);
                          setShowForm(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
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

export default AdminProducts;
