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

// Sync local cart to API on login
export const syncLocalCartToAPI = createAsyncThunk('cart/syncLocal', async (localItems, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/cart/sync', { items: localItems });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to sync local cart');
  }
});

// Wrapper Thunks for components to call directly
export const addToCart = createAsyncThunk('cart/add', async ({ product, quantity, weight, isAuthenticated }, { dispatch, rejectWithValue }) => {
  if (isAuthenticated) {
    try {
      const { data } = await API.post('/cart', { productId: product.id, quantity, weight });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  } else {
    dispatch(addToCartLocal({ product, quantity, weight }));
    return null;
  }
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ id, quantity, isAuthenticated }, { dispatch, rejectWithValue }) => {
  if (isAuthenticated) {
    try {
      const { data } = await API.put(`/cart/${id}`, { quantity });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    }
  } else {
    dispatch(updateCartLocal({ id, quantity }));
    return null;
  }
});

export const removeFromCart = createAsyncThunk('cart/remove', async ({ id, isAuthenticated }, { dispatch, rejectWithValue }) => {
  if (isAuthenticated) {
    try {
      const { data } = await API.delete(`/cart/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  } else {
    dispatch(removeFromCartLocal(id));
    return null;
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
    const mapCartItems = (items) => {
      return items.map(i => ({
        id: i.id,
        productId: i.Product?.id || i.productId,
        name: i.Product?.name || '',
        slug: i.Product?.slug || '',
        image: i.Product?.images?.[0] || '',
        price: i.price,
        quantity: i.quantity,
        weight: i.weight,
      }));
    };

    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload?.items) {
          const mapped = mapCartItems(action.payload.items);
          state.items = mapped;
          state.itemCount = mapped.reduce((s, i) => s + i.quantity, 0);
          localStorage.setItem('cart', JSON.stringify(mapped));
          localStorage.setItem('cartCount', state.itemCount.toString());
        }
      })
      .addCase(syncLocalCartToAPI.fulfilled, (state, action) => {
        if (action.payload?.items) {
          const mapped = mapCartItems(action.payload.items);
          state.items = mapped;
          state.itemCount = mapped.reduce((s, i) => s + i.quantity, 0);
          localStorage.setItem('cart', JSON.stringify(mapped));
          localStorage.setItem('cartCount', state.itemCount.toString());
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload?.items) {
          const mapped = mapCartItems(action.payload.items);
          state.items = mapped;
          state.itemCount = mapped.reduce((s, i) => s + i.quantity, 0);
          localStorage.setItem('cart', JSON.stringify(mapped));
          localStorage.setItem('cartCount', state.itemCount.toString());
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (action.payload?.items) {
          const mapped = mapCartItems(action.payload.items);
          state.items = mapped;
          state.itemCount = mapped.reduce((s, i) => s + i.quantity, 0);
          localStorage.setItem('cart', JSON.stringify(mapped));
          localStorage.setItem('cartCount', state.itemCount.toString());
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload?.items) {
          const mapped = mapCartItems(action.payload.items);
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
