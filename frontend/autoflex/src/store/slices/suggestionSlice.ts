import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/service/api';
import type { ProductionSuggestion } from '@/types';

interface SuggestionState {
  suggestions: ProductionSuggestion[];
  loading: boolean;
  error: string | null;
}

const initialState: SuggestionState = {
  suggestions: [],
  loading: false,
  error: null,
};


export const fetchProductionSuggestions = createAsyncThunk(
  'suggestions/fetchSuggestions',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get<ProductionSuggestion[]>('/products/suggestions');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductionSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductionSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchProductionSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSuggestions } = suggestionSlice.actions;
export default suggestionSlice.reducer;