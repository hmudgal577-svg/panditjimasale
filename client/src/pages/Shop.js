import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/common/ProductCard';
import { ProductSkeleton } from '../components/common/Skeleton';
import { FiFilter, FiX, FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import SEO from '../components/common/SEO';

const PRICE_PRESETS = [
  { label: 'Under ₹200', min: '', max: '200' },
  { label: '₹200 – ₹500', min: '200', max: '500' },
  { label: '₹500 – ₹1000', min: '500', max: '1000' },
  { label: 'Above ₹1000', min: '1000', max: '' },
];

const CATEGORIES = [
  { slug: 'whole-spices', label: 'Khade Masale', emoji: '🌶️', desc: 'Whole Spices' },
  { slug: 'dry-fruits', label: 'Dry Fruits', emoji: '🥜', desc: 'Nuts & Berries' },
  { slug: 'pooja-items', label: 'Pooja Samagri', emoji: '🪔', desc: 'Puja Items' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, total, page, totalPages, loading } = useSelector(state => state.products);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'newest',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
    isOrganic: searchParams.get('isOrganic') || '',
  });

  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
    params.page = searchParams.get('page') || 1;
    dispatch(fetchProducts(params));
  }, [dispatch, filters, searchParams]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value); else params.delete(key);
    params.delete('page');
    setSearchParams(params);
  };

  const updatePricePreset = (preset) => {
    const activePreset = filters.minPrice === preset.min && filters.maxPrice === preset.max;
    if (activePreset) {
      setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
      const params = new URLSearchParams(searchParams);
      params.delete('minPrice'); params.delete('maxPrice'); params.delete('page');
      setSearchParams(params);
    } else {
      setFilters(prev => ({ ...prev, minPrice: preset.min, maxPrice: preset.max }));
      const params = new URLSearchParams(searchParams);
      if (preset.min) params.set('minPrice', preset.min); else params.delete('minPrice');
      if (preset.max) params.set('maxPrice', preset.max); else params.delete('maxPrice');
      params.delete('page');
      setSearchParams(params);
    }
  };

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ category: '', search: '', sort: 'newest', minPrice: '', maxPrice: '', minRating: '', isOrganic: '' });
    setSearchParams({});
  };

  const isFiltered = Object.entries(filters).some(([k, v]) => k !== 'sort' && v);

  // Active filter chips
  const activeChips = [];
  if (filters.category) {
    const cat = CATEGORIES.find(c => c.slug === filters.category);
    activeChips.push({ label: cat ? `${cat.emoji} ${cat.label}` : filters.category, key: 'category' });
  }
  if (filters.minPrice || filters.maxPrice) {
    const preset = PRICE_PRESETS.find(p => p.min === filters.minPrice && p.max === filters.maxPrice);
    activeChips.push({ label: preset ? preset.label : `₹${filters.minPrice || 0} - ₹${filters.maxPrice || '∞'}`, key: 'price' });
  }
  if (filters.minRating) activeChips.push({ label: `${filters.minRating}★ & Up`, key: 'minRating' });
  if (filters.isOrganic) activeChips.push({ label: '🌿 Organic Only', key: 'isOrganic' });

  const removeChip = (key) => {
    if (key === 'price') {
      updateFilter('minPrice', '');
      updateFilter('maxPrice', '');
    } else {
      updateFilter(key, '');
    }
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-lg text-darkbrown">Filters</h2>
        {isFiltered && (
          <button onClick={clearFilters} className="text-xs text-maroon hover:underline font-medium bg-maroon/10 px-2 py-1 rounded-full">
            Clear All
          </button>
        )}
        <button onClick={() => setShowFilters(false)} className="md:hidden text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter('category', '')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${!filters.category ? 'bg-maroon text-white shadow-sm' : 'hover:bg-gray-50 text-gray-700'}`}
          >
            <span>🛒</span> All Products
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => updateFilter('category', cat.slug)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${filters.category === cat.slug ? 'bg-maroon text-white shadow-sm' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <span className="flex items-center gap-2">
                <span>{cat.emoji}</span> {cat.label}
              </span>
              <span className={`text-xs ${filters.category === cat.slug ? 'text-white/70' : 'text-gray-400'}`}>{cat.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          {PRICE_PRESETS.map((preset) => {
            const active = filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={preset.label}
                onClick={() => updatePricePreset(preset)}
                className={`px-2 py-2 rounded-xl text-xs font-medium border transition-all text-center ${active ? 'bg-maroon text-white border-maroon shadow-sm' : 'border-gray-200 text-gray-600 hover:border-maroon hover:text-maroon'}`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            type="number"
            placeholder="Min ₹"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon"
          />
          <span className="text-gray-400 font-bold">–</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon"
          />
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map(r => (
            <button
              key={r}
              onClick={() => updateFilter('minRating', filters.minRating === String(r) ? '' : r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${filters.minRating === String(r) ? 'bg-maroon text-white' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <span className="flex">
                {Array(r).fill(0).map((_, i) => <FiStar key={i} size={13} className={filters.minRating === String(r) ? 'fill-white text-white' : 'fill-gold text-gold'} />)}
                {Array(5 - r).fill(0).map((_, i) => <FiStar key={i} size={13} className="text-gray-300" />)}
              </span>
              <span className="text-xs">& Up</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Organic */}
      <div>
        <button
          onClick={() => updateFilter('isOrganic', filters.isOrganic ? '' : 'true')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${filters.isOrganic ? 'bg-green-50 border-green-500 text-green-700' : 'border-dashed border-gray-200 text-gray-600 hover:border-green-400'}`}
        >
          <span className="text-lg">🌿</span>
          <div className="text-left">
            <div className="font-semibold">Organic Only</div>
            <div className={`text-xs ${filters.isOrganic ? 'text-green-600' : 'text-gray-400'}`}>No chemicals, 100% natural</div>
          </div>
          {filters.isOrganic && <span className="ml-auto text-green-500">✓</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title={
          filters.search ? `"${filters.search}" ke Results` :
          filters.category === 'whole-spices' ? 'Khade Masale Online — Buy Whole Spices' :
          filters.category === 'dry-fruits' ? 'Dry Fruits Online — Badam, Kaju, Pista' :
          filters.category === 'pooja-items' ? 'Pooja Samagri Online — Puja Items' :
          'Shop All — Masale, Dry Fruits & Pooja Samagri'
        }
        description={
          filters.category === 'whole-spices' ? 'Buy pure Khade Masale (Whole Spices) online — Kali Mirch, Jeera, Elaichi, Long, Dalchini and more. 100% natural, no adulteration.' :
          filters.category === 'dry-fruits' ? 'Buy premium dry fruits online — Badam, Kaju, Pista, Akhrot and more. Fresh and natural, directly sourced.' :
          filters.category === 'pooja-items' ? 'Buy Pooja Samagri online — Kapoor, Chandan, Rui Batti and more for daily puja and festivals.' :
          'Shop all premium quality Masale, Dry Fruits, and Pooja Samagri online. Free delivery above ₹499.'
        }
        url="/shop"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-darkbrown">
              {filters.search ? `Results for "${filters.search}"` : filters.category ? (CATEGORIES.find(c => c.slug === filters.category)?.label || 'Products') : 'All Products'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {loading ? 'Searching...' : `${total} products found`}
            </p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 bg-maroon text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
            <FiFilter size={16} /> Filters {isFiltered && <span className="bg-white text-maroon rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">{activeChips.length}</span>}
          </button>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {activeChips.map(chip => (
              <span key={chip.key} className="inline-flex items-center gap-1.5 bg-maroon/10 text-maroon text-sm px-3 py-1.5 rounded-full font-medium">
                {chip.label}
                <button onClick={() => removeChip(chip.key)} className="hover:bg-maroon/20 rounded-full p-0.5"><FiX size={12} /></button>
              </span>
            ))}
            <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-red-500 px-2 underline">
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-50 overflow-auto p-4">
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 mb-5 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 hidden md:block">
                Showing <span className="font-semibold text-darkbrown">{products.length}</span> of <span className="font-semibold text-darkbrown">{total}</span> products
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500">Sort:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-maroon/30 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {loading ? (
              <ProductSkeleton count={8} />
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-xl font-bold text-darkbrown mb-2">Koi product nahi mila</h3>
                <p className="text-gray-500 mb-6">Filter change karke dobara try karein</p>
                <button onClick={clearFilters} className="bg-maroon text-white px-6 py-2.5 rounded-xl font-medium hover:bg-maroon/90 transition-colors">
                  Sab Products Dekhein
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  disabled={page <= 1}
                  onClick={() => changePage(page - 1)}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <FiChevronLeft size={16} /> Prev
                </button>
                {Array(totalPages).fill(0).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => changePage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-semibold text-sm transition-colors ${page === i + 1 ? 'bg-maroon text-white shadow-sm' : 'border border-gray-200 hover:bg-gray-50 text-gray-700'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page >= totalPages}
                  onClick={() => changePage(page + 1)}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Next <FiChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
