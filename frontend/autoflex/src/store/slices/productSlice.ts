import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { api } from '@/service/api';


interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}


export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get<Product[]>('/products');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    },

    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
  setLoading,
  setError
} = productSlice.actions;

export default productSlice.reducer;