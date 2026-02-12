import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; import type { RawMaterial } from "../../types";
import { api } from '@/service/api';

interface InventoryState {
  materials: RawMaterial[];
  loading: boolean;
  error: string | null;
}

export const fetchMaterials = createAsyncThunk<RawMaterial[], void>(
  'iventory/fetchMaterials',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get<RawMaterial[]>('/materials');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMaterial = createAsyncThunk<number, number>(
  'inventory/deleteMaterial',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/materials/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Cannot delete: Material is linked to products");
    }
  }
);

export const editMaterial = createAsyncThunk<RawMaterial, RawMaterial>(
  'inventory/updateMaterial',
  async (material: RawMaterial, { rejectWithValue }) => {
    try {
      const response = await api.put<RawMaterial>(`/materials/${material.id}`, material);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update material");
    }
  }
);

export const createMaterial = createAsyncThunk<RawMaterial, Omit<RawMaterial, 'id'>>(
  'inventory/createMaterial',
  async (newMaterial, { rejectWithValue }) => {
    try {
      return await api.post<RawMaterial>('/materials', newMaterial);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create material");
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
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.materials = state.materials.filter(m => m.id !== action.payload);
      })
      .addCase(editMaterial.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.materials.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.materials[index] = action.payload;
        }
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.materials.push(action.payload);
      })
      .addMatcher(
        (action): action is PayloadAction<string> => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "An unexpected error occurred";
        }
      );
    ;
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