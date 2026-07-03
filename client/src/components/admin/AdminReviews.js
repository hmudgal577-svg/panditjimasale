import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { FiStar, FiCheck, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadReviews(); }, []);

  const loadReviews = async () => {
    try { const { data } = await API.get('/admin/reviews'); setReviews(data.reviews); } finally { setLoading(false); }
  };

  const handleApprove = async (id) => {
    try { await API.put(`/admin/reviews/${id}/approve`); toast.success('Review approved'); loadReviews(); } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try { await API.delete(`/admin/reviews/${id}`); toast.success('Deleted'); loadReviews(); } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-6">Reviews</h1>
      <div className="space-y-3">
        {reviews.map(review => (
          <div key={review.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold">{review.User?.name}</span>
                  <span className="text-sm text-gray-500">on</span>
                  <span className="text-sm font-medium text-maroon">{review.Product?.name}</span>
                </div>
                <div className="flex mb-1">{Array(review.rating).fill(0).map((_, i) => <FiStar key={i} className="fill-saffron text-saffron" size={14} />)}</div>
                {review.title && <p className="font-medium text-sm">{review.title}</p>}
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                {!review.isApproved && (
                  <button onClick={() => handleApprove(review.id)} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"><FiCheck /></button>
                )}
                <button onClick={() => handleDelete(review.id)} className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"><FiTrash2 /></button>
              </div>
            </div>
          </div>
        ))}
        {!loading && reviews.length === 0 && <p className="text-center text-gray-500 py-8">No reviews yet.</p>}
      </div>
    </div>
  );
};

export default AdminReviews;
