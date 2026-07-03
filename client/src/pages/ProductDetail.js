import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../utils/axios';
import { addToCartLocal } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import ProductCard from '../components/common/ProductCard';
import SEO from '../components/common/SEO';
import { FiHeart, FiShoppingCart, FiTruck, FiShield, FiRefreshCw, FiStar, FiMinus, FiPlus, FiSearch } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Smart keyword generator based on product name & category
const generateKeywords = (product) => {
  const name = product?.name || '';
  const nameLower = name.toLowerCase();
  const cat = product?.Category?.slug || product?.category?.slug || product?.categorySlug || '';

  const baseKeywords = [
    name,
    `${name} online`,
    `${name} buy online`,
    `${name} price`,
    `buy ${name}`,
    `${name} gwalior`,
    `${name} madhya pradesh`,
    `${name} online india`,
    'pandit ji masale',
  ];

  if (cat === 'whole-spices' || nameLower.includes('masala') || nameLower.includes('mirch') || nameLower.includes('jeera') || nameLower.includes('elaichi') || nameLower.includes('laung') || nameLower.includes('dalchini')) {
    baseKeywords.push('khade masale online', 'whole spices india', 'masale online order', 'shuddh masale', 'pure spices online', 'masale gwalior', `${name} khade masale`);
  }
  if (cat === 'dry-fruits' || nameLower.includes('badam') || nameLower.includes('kaju') || nameLower.includes('pista') || nameLower.includes('akhrot') || nameLower.includes('kishmish') || nameLower.includes('khajoor') || nameLower.includes('khumani') || nameLower.includes('chilgoza') || nameLower.includes('trail') || nameLower.includes('plum') || nameLower.includes('prune')) {
    baseKeywords.push('dry fruits online india', 'premium dry fruits', 'dry fruits gwalior', 'fresh dry fruits', `${name} online buy`, 'nuts online india');
  }
  if (cat === 'pooja-items' || nameLower.includes('kapoor') || nameLower.includes('chandan') || nameLower.includes('aggarbatti') || nameLower.includes('pooja') || nameLower.includes('gangajal') || nameLower.includes('kumkum') || nameLower.includes('dhoop') || nameLower.includes('kit') || nameLower.includes('guggul') || nameLower.includes('mishri') || nameLower.includes('thali') || nameLower.includes('panchgavya')) {
    baseKeywords.push('pooja samagri online', 'puja items online', 'pooja samagri gwalior', 'shuddh pooja samagri', 'pooja ki saman online');
  }

  return [...new Set(baseKeywords)].join(', ');
};

// Visible search tags for the product
const getSearchTags = (product) => {
  const name = product?.name || '';
  const nameLower = name.toLowerCase();
  const cat = product?.Category?.slug || product?.category?.slug || '';

  const tags = [name];

  if (cat === 'whole-spices' || nameLower.includes('mirch') || nameLower.includes('jeera') || nameLower.includes('elaichi') || nameLower.includes('laung') || nameLower.includes('dalchini') || nameLower.includes('masala')) {
    tags.push('Khade Masale', 'Whole Spices', 'Shuddh Masale', 'Kaali Mirch', 'Long Cloves', 'Jeera Cumin', 'Dalchini', 'Elaichi Cardamom', 'Tez Patta', 'Dhaniya Seeds');
  }
  if (cat === 'dry-fruits' || nameLower.includes('badam') || nameLower.includes('kaju') || nameLower.includes('pista') || nameLower.includes('akhrot') || nameLower.includes('kishmish') || nameLower.includes('anjeer')) {
    tags.push('Dry Fruits', 'Badam Almonds', 'Kaju Cashews', 'Pista Pistachio', 'Kishmish Raisins', 'Akhrot Walnut', 'Anjeer Figs');
  }
  if (cat === 'pooja-items' || nameLower.includes('kapoor') || nameLower.includes('chandan') || nameLower.includes('pooja') || nameLower.includes('batti')) {
    tags.push('Pooja Samagri', 'Puja Items', 'Bhimseni Kapoor', 'Pure Chandan', 'Rui Batti Cotton');
  }
  tags.push('Gwalior', 'Free Delivery', '100% Pure');
  return [...new Set(tags)];
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { featured } = useSelector(state => state.products);
  const wishlist = useSelector(state => state.wishlist.items);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    API.get(`/products/${slug}`).then(({ data }) => {
      setProduct(data.product);
      if (data.product.weightOptions?.length) setSelectedWeight(data.product.weightOptions[0]);
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="skeleton h-96 w-full rounded-xl" />
      <div className="mt-4 space-y-2">
        <div className="skeleton h-6 w-1/2" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-10 w-40" />
      </div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">🔍</p>
      <h2 className="text-2xl font-bold text-darkbrown">Product nahi mila</h2>
      <Link to="/shop" className="mt-4 inline-block text-maroon hover:underline">← Shop par jaayein</Link>
    </div>
  );

  const isInWishlist = wishlist.some(i => i.productId === product.id || i.id === product.id);
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
  const currentPrice = selectedWeight?.price || product.discountPrice || product.price;
  const originalPrice = selectedWeight ? product.price : product.price;
  const imageUrl = product.images?.[activeImage] || product.images?.[0] || 'https://via.placeholder.com/500x500?text=Pandit+Ji';

  const productKeywords = generateKeywords(product);
  const searchTags = getSearchTags(product);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.[0],
    brand: { '@type': 'Brand', name: 'Pandit Ji Masale' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: currentPrice,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Pandit Ji Masale, Gwalior' },
    },
    aggregateRating: product.numReviews > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.numReviews,
    } : undefined,
  };

  const handleAddToCart = () => {
    dispatch(addToCartLocal({ product: { ...product, discountPrice: currentPrice, price: originalPrice }, quantity, weight: selectedWeight?.label }));
    toast.success('Cart mein add ho gaya!');
  };

  const handleWhatsAppOrder = () => {
    const msg = encodeURIComponent(`Namaste! Mujhe ${product.name} ${selectedWeight ? `(${selectedWeight.label})` : ''} ka order karna hai. Price: ₹${currentPrice}. Qty: ${quantity}`);
    window.open(`https://wa.me/917415992703?text=${msg}`, '_blank');
  };

  const related = featured.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title={`${product.name} — Buy Online | Pandit Ji Masale, Gwalior`}
        description={`Buy ${product.name} online from Pandit Ji Masale, Gwalior. ${product.description?.slice(0, 120) || '100% pure and natural'}. Free delivery above ₹499. Order on WhatsApp: 7415992703.`}
        keywords={productKeywords}
        url={`/product/${slug}`}
        type="product"
        structuredData={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-maroon">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-maroon">Shop</Link>
          <span>/</span>
          <span className="text-darkbrown font-medium">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-3">
              <img src={imageUrl} alt={product.name} className="w-full h-80 md:h-96 object-cover" />
            </div>
            {product.images?.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-all ${i === activeImage ? 'border-maroon shadow-md' : 'border-gray-200 hover:border-gray-400'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.isOrganic && <span className="badge bg-green-100 text-green-700">🌿 Certified Organic</span>}
              {product.isFeatured && <span className="badge bg-gold/20 text-darkbrown">⭐ Best Seller</span>}
              {hasDiscount && <span className="badge bg-red-100 text-red-600">{discountPercent}% OFF</span>}
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-darkbrown mb-2">{product.name}</h1>

            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center gap-1">
                {Array(5).fill(0).map((_, i) => (
                  <FiStar key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-saffron text-saffron' : 'text-gray-300'} />
                ))}
              </div>
              <span className="font-semibold text-darkbrown">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.numReviews} reviews)</span>
            </div>

            <div className="flex items-baseline space-x-3 mb-5 bg-white rounded-xl p-4 border border-gray-100">
              <span className="text-4xl font-bold text-maroon">₹{currentPrice}</span>
              {hasDiscount && <span className="text-xl text-gray-400 line-through">₹{originalPrice}</span>}
              <span className="text-sm text-green-600 font-medium">Free delivery above ₹499</span>
            </div>

            {/* Weight Options */}
            {product.weightOptions?.length > 0 && (
              <div className="mb-5">
                <h3 className="font-semibold mb-2 text-gray-700">Select Weight:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((w, i) => (
                    <button key={i} onClick={() => setSelectedWeight(w)} className={`px-4 py-2 rounded-xl border-2 font-medium text-sm transition-all ${selectedWeight?.label === w.label ? 'border-maroon bg-maroon text-white shadow-sm' : 'border-gray-200 hover:border-maroon text-gray-700'}`}>
                      {w.label} — ₹{w.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center space-x-4 mb-5">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50 text-darkbrown"><FiMinus size={16} /></button>
                <span className="px-5 font-bold text-lg text-darkbrown">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50 text-darkbrown"><FiPlus size={16} /></button>
              </div>
              <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex gap-3">
                <button onClick={handleAddToCart} disabled={product.stock <= 0} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
                  <FiShoppingCart size={20} /> Add to Cart
                </button>
                <button onClick={() => dispatch(toggleWishlist(product))} className={`p-3 rounded-xl border-2 transition-all ${isInWishlist ? 'border-red-300 bg-red-50 text-red-500' : 'border-gray-200 hover:border-red-300 text-gray-500'}`}>
                  <FiHeart className={isInWishlist ? 'fill-red-500' : ''} size={20} />
                </button>
              </div>
              {/* WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white transition-all"
                style={{ background: '#25D366', boxShadow: '0 4px 15px rgba(37,211,102,0.3)' }}
              >
                <FaWhatsapp size={22} />
                WhatsApp par Order Karein
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { icon: <FiTruck size={16} />, text: 'Free delivery ₹499+' },
                { icon: <FiShield size={16} />, text: '100% Pure & Natural' },
                { icon: <FiRefreshCw size={16} />, text: 'Easy Returns' },
                { icon: <FiStar size={16} />, text: 'Premium Quality' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600 bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <span className="text-maroon">{b.icon}</span> {b.text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
              <h3 className="font-bold text-darkbrown mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {product.ingredients && (
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                <h3 className="font-bold text-darkbrown mb-2">Ingredients / Origin</h3>
                <p className="text-gray-600 text-sm">{product.ingredients}</p>
              </div>
            )}

            {/* 🔑 SEARCH KEYWORDS / TAGS — visible to users */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <FiSearch size={15} className="text-maroon" />
                <h3 className="font-semibold text-sm text-gray-600">Search Keywords</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchTags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/shop?search=${encodeURIComponent(tag)}`)}
                    className="text-xs px-3 py-1.5 rounded-full bg-maroon/8 text-maroon border border-maroon/20 hover:bg-maroon hover:text-white transition-all font-medium cursor-pointer"
                    style={{ background: i === 0 ? 'rgba(122,30,30,0.08)' : 'rgba(122,30,30,0.05)' }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Kisi bhi tag par click karke related products dekhein</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.Reviews?.length > 0 && (
          <section className="mt-12 bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-2xl font-heading font-bold text-darkbrown mb-6">Customer Reviews ⭐</h2>
            <div className="space-y-4">
              {product.Reviews.map(review => (
                <div key={review.id} className="border-b border-gray-50 pb-4 last:border-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-maroon/10 rounded-full flex items-center justify-center text-maroon font-bold">{review.User?.name?.[0]}</div>
                    <div>
                      <p className="font-semibold text-darkbrown">{review.User?.name}</p>
                      <div className="flex">{Array(review.rating).fill(0).map((_, i) => <FiStar key={i} className="fill-saffron text-saffron" size={13} />)}</div>
                    </div>
                  </div>
                  {review.title && <p className="font-medium text-sm text-darkbrown mb-1">{review.title}</p>}
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-darkbrown mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
