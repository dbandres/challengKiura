import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define la estructura de un producto
interface Products {
  id: number;
  title: string;
  price: number;
  // Otros campos si los tienes
}

export interface ProductsState {
  products: Products[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Definir el estado inicial
const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

interface PropsFetch {
  propiedad?: string
}

// Definir una función asincrónica para obtener los productos
export const fetchProducts = createAsyncThunk<Products[]>(
  'products/fetchProducts',
  async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Error en la peticion a /products');
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      throw error
    }
  }
);

// Definir una función asincrónica para obtener los productos por categoria
export const fetchCategoryProducts = createAsyncThunk<Products[], PropsFetch>(
  'products/fetchCategoryProducts',
  async (props: PropsFetch) => {
    console.log(props);
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${props}`);
      if (!response.ok) {
        throw new Error('Error en la petición a /category');
      }
      const data = await response.json();
      return data.products; 
    } catch (error) {
      throw error; 
    }
  }
);

// Definir una función asincrónica para obtener los productos por search
export const fetchSearchProducts = createAsyncThunk<Products[], PropsFetch>(
  'products/fetchSearchProducts',
  async (props: PropsFetch) => {
    console.log(props);
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${props}`);
      if (!response.ok) {
        throw new Error('Error en la petición a /category');
      }
      const data = await response.json();
      return data.products; 
    } catch (error) {
      throw error; 
    }
  }
);


// Crear el slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // fetchCategoryProducts
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      //fetchSearchProducts
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchSearchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
  },
});

// Exportar acciones y selector si es necesario
export const productActions = productsSlice.actions;
export const productReducer = productsSlice.reducer;
export const getProducts = (state: { products: ProductsState }) => state.products;