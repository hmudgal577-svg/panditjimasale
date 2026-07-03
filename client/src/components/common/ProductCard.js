import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { addToCartLocal } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/image';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlist.some(i => i.productId === product.id || i.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCartLocal({ product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
  const imageUrl = getImageUrl(product.images?.[0]);

  return (
    <Link to={`/product/${product.slug}`} className="card group overflow-hidden">
      <div className="relative overflow-hidden bg-gray-50">
        <img src={imageUrl} alt={product.name} className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {hasDiscount && <span className="absolute top-2 left-2 bg-maroon text-white text-xs font-bold px-2 py-1 rounded">-{discountPercent}%</span>}
        {product.isOrganic && <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Organic</span>}
        {product.stock <= 0 && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="bg-white text-darkbrown px-4 py-1 rounded font-semibold">Out of Stock</span></div>}
        <button onClick={handleToggleWishlist} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
          <FiHeart className={isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'} size={16} />
        </button>
        <button onClick={handleAddToCart} className="absolute bottom-2 right-2 w-9 h-9 bg-maroon text-white rounded-full flex items-center justify-center hover:bg-maroon-light transition-colors opacity-0 group-hover:opacity-100 shadow-lg">
          <FiShoppingCart size={16} />
        </button>
      </div>
      <div className="p-3 md:p-4">
        <p className="text-xs text-saffron font-medium mb-1">{product.Category?.name || 'Spices'}</p>
        <h3 className="font-semibold text-darkbrown text-sm md:text-base line-clamp-2 mb-1 group-hover:text-maroon transition-colors">{product.name}</h3>
        <div className="flex items-center space-x-1 mb-2">
          <FiStar className="fill-saffron text-saffron" size={14} />
          <span className="text-sm font-medium">{product.rating || '4.5'}</span>
          <span className="text-xs text-gray-500">({product.numReviews || 0})</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-maroon">₹{hasDiscount ? product.discountPrice : product.price}</span>
          {hasDiscount && <span className="text-sm text-gray-400 line-through">₹{product.price}</span>}
        </div>
        {product.weightOptions && product.weightOptions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.weightOptions.slice(0, 3).map((w, i) => (
              <span key={i} className="text-xs bg-cream text-gray-600 px-2 py-0.5 rounded">{w.label}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
