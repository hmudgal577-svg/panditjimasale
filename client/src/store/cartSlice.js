import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../utils/axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/cart');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load cart');
  }
});

export const addToCartAPI = createAsyncThunk('cart/addToCart', async ({ productId, quantity, weight }, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/cart', { productId, quantity, weight });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
  }
});

export const updateCartItemAPI = createAsyncThunk('cart/updateCartItem', async ({ id, quantity }, { rejectWithValue }) => {
  try {
    const { data } = await API.put(`/cart/${id}`, { quantity });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
  }
});

export const removeFromCartAPI = createAsyncThunk('cart/removeFromCart', async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.delete(`/cart/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
  }
});

const initialState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  itemCount: parseInt(localStorage.getItem('cartCount') || '0'),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const { product, quantity = 1, weight } = action.payload;
      const existing = state.items.find(i => i.productId === product.id && i.weight === (weight || null));
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id: Date.now(),
          productId: product.id,
          name: product.name,
          slug: product.slug,
          image: product.images?.[0] || '',
          price: product.discountPrice || product.price,
          quantity,
          weight,
        });
      }
      state.itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('cartCount', state.itemCount.toString());
    },
    updateCartLocal: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      state.itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('cartCount', state.itemCount.toString());
    },
    removeFromCartLocal: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('cartCount', state.itemCount.toString());
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      localStorage.removeItem('cart');
      localStorage.removeItem('cartCount');
    },
    syncCart: (state, action) => {
      state.items = action.payload.items || [];
      state.itemCount = action.payload.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('cartCount', state.itemCount.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        if (action.payload.items) {
          const mapped = action.payload.items.map(i => ({
            id: i.id,
            productId: i.Product?.id || i.productId,
            name: i.Product?.name || '',
            slug: i.Product?.slug || '',
            image: i.Product?.images?.[0] || '',
            price: i.price,
            quantity: i.quantity,
            weight: i.weight,
          }));
          state.items = mapped;
          state.itemCount = mapped.reduce((s, i) => s + i.quantity, 0);
          localStorage.setItem('cart', JSON.stringify(mapped));
          localStorage.setItem('cartCount', state.itemCount.toString());
        }
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload.items) {
          const mapped = action.payload.items.map(i => ({
            id: i.id,
            productId: i.Product?.id || i.productId,
            name: i.Product?.name || '',
            slug: i.Product?.slug || '',
            image: i.Product?.images?.[0] || '',
            price: i.price,
            quantity: i.quantity,
            weight: i.weight,
          }));
          state.items = mapped;
          state.itemCount = mapped.reduce((s, i) => s + i.quantity, 0);
          localStorage.setItem('cart', JSON.stringify(mapped));
          localStorage.setItem('cartCount', state.itemCount.toString());
        }
      });
  },
});

export const { addToCartLocal, updateCartLocal, removeFromCartLocal, clearCart, syncCart } = cartSlice.actions;
export default cartSlice.reducer;
