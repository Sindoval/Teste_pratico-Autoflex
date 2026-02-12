import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './slices/inventorySlice';
import productReducer from './slices/productSlice';
import suggestionReducer from './slices/suggestionSlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    products: productReducer,
    suggestions: suggestionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;