import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../store/productSlice';
import ProductCard from '../components/common/ProductCard';
import { ProductSkeleton, BannerSkeleton } from '../components/common/Skeleton';
import { FiTruck, FiShield, FiAward, FiStar, FiArrowRight } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const Home = () => {
  const dispatch = useDispatch();
  const { featured, loading } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [activeBanner, setActiveBanner] = useState(0);

  const banners = [
    { title: 'Sabse Shuddh Khade Masale', subtitle: 'Directly from best farms of Kerala, Rajasthan & Kashmir', bg: 'from-maroon to-maroon-dark', img: '/uploads/cat-masale.jpg' },
    { title: 'Premium Dry Fruits', subtitle: 'Pure, fresh & nutritious — straight to your home', bg: 'from-saffron to-saffron-dark', img: '/uploads/cat-dry-fruits.jpg' },
    { title: 'Sampurna Pooja Samagri', subtitle: 'Shuddh pooja items for your daily worship & festivals', bg: 'from-darkbrown to-darkbrown-light', img: '/uploads/cat-pooja.jpg' },
  ];

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => setActiveBanner((prev) => (prev + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: 'Khade Masale', slug: 'whole-spices', image: '/uploads/cat-masale.jpg', count: 'Kaali Mirch, Long, Jeera & more' },
    { name: 'Dry Fruits', slug: 'dry-fruits', image: '/uploads/cat-dry-fruits.jpg', count: 'Badam, Kaju, Pista & more' },
    { name: 'Pooja Samagri', slug: 'pooja-items', image: '/uploads/cat-pooja.jpg', count: 'Kapoor, Chandan & Rui Batti' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', text: 'The quality of spices from Pandit Ji is unmatched. Pure, aromatic, and fresh!', rating: 5, location: 'Mumbai' },
    { name: 'Amit Patel', text: 'I have been ordering dry fruits for months now. Always fresh and well-packaged.', rating: 5, location: 'Ahmedabad' },
    { name: 'Sneha Gupta', text: 'The Kashmiri chili powder gives the perfect color and flavor. Highly recommended!', rating: 5, location: 'Delhi' },
  ];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pandit Ji Masale',
    description: 'Premium quality Khade Masale, Dry Fruits, and Pooja Samagri online store in India.',
    url: 'https://panditjimasale.com',
    telephone: '+917415992703',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+917415992703',
      contactType: 'customer service',
      availableLanguage: ['Hindi', 'English'],
    },
    sameAs: [`https://wa.me/917415992703`],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Masale, Dry Fruits & Pooja Samagri',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Khade Masale (Whole Spices)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Dry Fruits' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Pooja Samagri' } },
      ],
    },
  };

  return (
    <div>
      <SEO
        title="Pandit Ji Masale — Premium Khade Masale, Dry Fruits & Pooja Samagri Online"
        description="Buy 100% pure Khade Masale (Whole Spices), premium Dry Fruits, and Pooja Samagri online. Direct from farms. Free delivery above ₹499. Order on WhatsApp: 7415992703."
        keywords="khade masale online, whole spices india, dry fruits buy online, pooja samagri, pandit ji masale, masale online order, pure masale without adulteration, kali mirch jeera elaichi online"
        structuredData={localBusinessSchema}
      />
      <section className="relative overflow-hidden bg-gradient-to-r from-maroon to-darkbrown text-white">
        {banners.map((banner, i) => (
          <div key={i} className={`transition-opacity duration-700 ${i === activeBanner ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
            <div className={`max-w-7xl mx-auto px-4 py-16 md:py-28 flex flex-col md:flex-row items-center justify-between`}>
              <div className="text-center md:text-left md:max-w-lg">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">{banner.title}</h1>
                <p className="text-lg md:text-xl text-white/80 mb-8">{banner.subtitle}</p>
                <Link to="/shop" className="inline-flex items-center bg-gold text-darkbrown px-8 py-3 rounded-lg font-bold hover:bg-gold-light transition-colors text-lg">
                  Shop Now <FiArrowRight className="ml-2" />
                </Link>
              </div>
              <div className="w-64 h-64 md:w-80 md:h-80 mt-8 md:mt-0 overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl bg-white/10 flex items-center justify-center">
                <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setActiveBanner(i)} className={`w-3 h-3 rounded-full transition-colors ${i === activeBanner ? 'bg-gold' : 'bg-white/40'}`} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle mb-8">Explore our wide range of premium quality products</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <Link key={cat.slug} to={`/shop?category=${cat.slug}`} className="card p-6 text-center hover:border-maroon hover:border-2 transition-all group flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-cream group-hover:border-maroon transition-colors bg-gray-50 flex items-center justify-center">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-heading font-bold text-lg text-darkbrown group-hover:text-maroon transition-colors">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle mb-8">Our best-selling premium quality products</p>
          {loading ? <ProductSkeleton /> : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featured.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/shop" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="section-title">Why Choose Pandit Ji?</h2>
        <p className="section-subtitle mb-8">We are committed to delivering the finest quality to your home</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <FiShield size={28} />, title: '100% Pure', desc: 'No adulteration, no preservatives, pure spices' },
            { icon: <FaLeaf size={28} />, title: 'Farm Fresh', desc: 'Directly sourced from best farms across India' },
            { icon: <FiAward size={28} />, title: 'Premium Quality', desc: 'Handpicked and quality tested products' },
            { icon: <FiTruck size={28} />, title: 'Fast Delivery', desc: 'Free delivery on orders above ₹499' },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 card">
              <div className="w-14 h-14 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4 text-maroon">{item.icon}</div>
              <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-maroon text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-white/80 text-center mb-8">Trusted by thousands of happy customers across India</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex mb-3">
                  {Array(t.rating).fill(0).map((_, i) => <FiStar key={i} className="fill-gold text-gold" size={16} />)}
                </div>
                <p className="text-white/90 mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-white/60 text-sm">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title mb-2">Stay Updated</h2>
          <p className="section-subtitle mb-6">Subscribe for exclusive offers, recipes, and new product launches</p>
          <form className="max-w-md mx-auto flex" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input type="email" placeholder="Enter your email" className="input-field rounded-r-none flex-1" required />
            <button type="submit" className="btn-primary rounded-l-none">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
