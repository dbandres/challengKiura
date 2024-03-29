import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Definir la interfaz para el estado
interface ProductId {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ProductIdState {
  product: ProductId | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Definir el estado inicial
const initialState: ProductIdState = {
  product: null,
  status: 'idle',
  error: null,
};

interface PropsFetch {
  propiedad?: number
}

// Definir una función asincrónica para obtener las categorías
export const fetchProductById = createAsyncThunk<ProductId, PropsFetch>(
  'product/fetchProductById',
  async (props: PropsFetch) => {
    const response = await fetch(`https://dummyjson.com/products/${props}`);
    if (!response.ok) {
      throw new Error('Error en la peticion a /categories');
    }
    const data = await response.json();
    return data;
  }
);


// Crear el slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

// Exportar acciones y selector si es necesario
export const productActions = productSlice.actions;
export const productByIdReducer = productSlice.reducer;
export const selectProductId = (state: { product: ProductIdState }) => state.product;
