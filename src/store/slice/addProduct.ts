import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface ProductForm {
  brand: string;
  category: string;
  description: string;
  discountPercentage: string;
  id: string;
  images: string;
  price: string;
  rating: string;
  stock: string;
  thumbnail: string;
  title: string;
}

export interface AddProductState {
  loading: boolean;
  error: string | null;
  newProducto: ProductForm | null
}

const initialState: AddProductState = {
  loading: false,
  error: null,
  newProducto: null
};

export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (productData: ProductForm, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const data = await response.json();

      const numericFields = ['discountPercentage', 'id', 'price', 'rating', 'stock'];
      const transformedData = {
        ...data,
        ...numericFields.reduce((acc, key) => {
          acc[key] = parseFloat(data[key]);
          return acc;
        }, {} as Record<string, number>)
      };
      return transformedData;
    } catch (error) {
      throw new Error('Failed');
    }
  }
);

const postProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.newProducto = action.payload
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const postProductReduce = postProductSlice.reducer;
export const addProductoPost = (state: { postProduct: AddProductState }) => state.postProduct;