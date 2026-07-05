import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/image';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.wishlist.items);
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleRemove = (item) => {
    dispatch(toggleWishlist({ id: item.productId || item.id }));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ product: item, quantity: 1, isAuthenticated }));
    toast.success('Added to cart!');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiHeart className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-heading font-bold mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-4">Save items you love to your wishlist</p>
        <Link to="/shop" className="btn-primary">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-6">My Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map(item => (
          <div key={item.id} className="card overflow-hidden group">
            <div className="relative">
              <Link to={`/product/${item.slug}`}>
                <img src={getImageUrl(item.image) || 'https://via.placeholder.com/300'} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </Link>
              <button onClick={() => handleRemove(item)} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"><FiX className="text-red-500" /></button>
            </div>
            <div className="p-3">
              <Link to={`/product/${item.slug}`} className="font-semibold text-sm line-clamp-1 hover:text-maroon">{item.name}</Link>
              <p className="text-maroon font-bold mt-1">₹{item.price}</p>
              <button onClick={() => handleAddToCart(item)} className="btn-primary text-sm py-1.5 w-full mt-2 flex items-center justify-center space-x-1">
                <FiShoppingCart size={14} /> <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
