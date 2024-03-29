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

export type AppDispatch = typeof store.dispatch

export type RootState = {
  categories: CategoryState;
  addProducto: ProductsState;
  postProducto: AddProductState
};

const rootReducer = combineReducers({
  categories: categoryReducer,
  addProducto: addProductReducer,
  postProduct: postProductReduce
});

export default rootReducer;