import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
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

// Define la interfaz para el estado de productos
export interface ProductsState {
  products: Product[]; // Un array de objetos Product
  message: string | null
}

// Define el estado inicial
const initialState: ProductsState = {
  products: [],
  message: null
};

// Crea un slice utilizando createSlice de Redux Toolkit
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducer para agregar un producto al estado
    addProduct: (state, action: PayloadAction<Product>) => {
      state.message = null
      const existingProduct = state.products.find(product => product.id === action.payload.id);
      if (existingProduct) {
        state.message = 'El producto ya se encuentra agregado a su Orden de compra.'
        return;
      } else {
        state.message = 'Producto agregado correctamente.'
        state.products.push(action.payload);
      }
    },
    // Reducer para eliminar un producto del estado
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    resetMessage: (state, action) => {
      state.message = null
    },
    removeAll: (state, action) =>{
      state.products = []
    }
    // Agrega otros reducers aquí según sea necesario
  }
});


export const { addProduct, removeProduct, resetMessage, removeAll } = productsSlice.actions;
export const misPedidos = (state: { productsSlice: ProductsState }) => state.productsSlice;
const addProductReducer = productsSlice.reducer
export default addProductReducer;