import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; import type { RawMaterial } from "../../types";
import { api } from '@/service/api';

interface InventoryState {
  materials: RawMaterial[];
  loading: boolean;
  error: string | null;
}

export const fetchMaterials = createAsyncThunk(
  'iventory/fetchMaterials',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get<RawMaterial[]>('/materials');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: InventoryState = {
  materials: [],
  loading: false,
  error: null
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setMaterials: (state, action: PayloadAction<RawMaterial[]>) => {
      state.materials = action.payload;
      state.loading = false;
    },

    addMaterial: (state, action: PayloadAction<RawMaterial>) => {
      state.materials.push(action.payload);
      state.loading = false;
    },

    updateMaterial: (state, action: PayloadAction<RawMaterial>) => {
      const index = state.materials.findIndex((material) => material.id === action.payload.id);

      if (index !== -1) {
        state.materials[index] = action.payload;
      }
    },

    removeMaterial: (state, action: PayloadAction<number>) => {
      state.materials = state.materials.filter((material) => material.id !== action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setMaterials,
  addMaterial,
  updateMaterial,
  removeMaterial,
  setLoading,
  setError
} = inventorySlice.actions;

export default inventorySlice.reducer;