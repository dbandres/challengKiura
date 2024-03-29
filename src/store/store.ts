import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { CategoryState, categoryReducer } from './slice/categoriesSlice'
import { productReducer } from './slice/getProductsSlice';
import { productByIdReducer } from './slice/productById';
import addProductReducer, { ProductsState } from './slice/addMisPedidos';
import { AddProductState, postProductReduce } from './slice/addProduct';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    product: productByIdReducer,
    addProducto: addProductReducer,
    postProduct: postProductReduce
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
/* export type RootState = ReturnType<typeof store.getState> */
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Define el tipo RootState combinando los tipos de estado de cada slice
export type RootState = {
  categories: CategoryState;
  addProducto: ProductsState;
  postProducto: AddProductState
  // Agrega otros tipos de estado aquí según tus slices
};

// Combina los reducers de cada slice en un reducer raíz
const rootReducer = combineReducers({
  categories: categoryReducer,
  addProducto: addProductReducer,
  postProduct: postProductReduce
  // Agrega otros reducers aquí
});

export default rootReducer;