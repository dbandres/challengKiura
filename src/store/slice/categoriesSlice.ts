import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Definir la interfaz para el estado
interface Category extends Array<string> {}

export interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Definir el estado inicial
const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
};

// Definir una función asincrónica para obtener las categorías
export const fetchCategories = createAsyncThunk<Category[], void>(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    if (!response.ok) {
      throw new Error('Error en la peticion a /categories');
    }
    const data = await response.json();
    return data;
  }
);


// Crear el slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});


export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
export const selectAllCategories = (state: { categories: CategoryState }) => state.categories.categories;
