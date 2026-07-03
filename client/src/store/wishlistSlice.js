import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../utils/axios';

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/wishlist');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load wishlist');
  }
});

export const addToWishlistAPI = createAsyncThunk('wishlist/add', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/wishlist', { productId });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
  }
});

export const removeFromWishlistAPI = createAsyncThunk('wishlist/remove', async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.delete(`/wishlist/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
  }
});

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  loading: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(i => i.productId === product.id || i.id === product.id);
      if (existing) {
        state.items = state.items.filter(i => i.id !== existing.id);
      } else {
        state.items.push({ id: Date.now(), productId: product.id, name: product.name, slug: product.slug, price: product.price, image: product.images?.[0] });
      }
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    syncWishlist: (state, action) => {
      state.items = action.payload || [];
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        if (action.payload.items) {
          const mapped = action.payload.items.map(i => ({
            id: i.id,
            productId: i.Product?.id || i.productId,
            name: i.Product?.name || '',
            slug: i.Product?.slug || '',
            price: i.Product?.discountPrice || i.Product?.price || 0,
            image: i.Product?.images?.[0] || '',
            stock: i.Product?.stock || 0,
          }));
          state.items = mapped;
          localStorage.setItem('wishlist', JSON.stringify(mapped));
        }
      });
  },
});

export const { toggleWishlist, syncWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
