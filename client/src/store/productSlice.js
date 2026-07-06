import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../utils/axios';

export const fetchProducts = createAsyncThunk('products/fetch', async (params, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/products', { params });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load products');
  }
});

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/products/featured');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load featured products');
  }
});

const initialState = {
  products: JSON.parse(localStorage.getItem('cached_products') || '[]'),
  featured: JSON.parse(localStorage.getItem('cached_featured') || '[]'),
  total: parseInt(localStorage.getItem('cached_total') || '0'),
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.total = 0;
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { 
        // Only set loading to true if we don't already have cached products to show
        if (state.products.length === 0) {
          state.loading = true; 
        }
        state.error = null; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        localStorage.setItem('cached_products', JSON.stringify(action.payload.products));
        localStorage.setItem('cached_total', action.payload.total.toString());
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featured = action.payload.products;
        localStorage.setItem('cached_featured', JSON.stringify(action.payload.products));
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
