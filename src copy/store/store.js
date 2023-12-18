import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../store/product/productSlice";
import filterReducer from '../store/product/filterSlice.js'
import categoryReducer from '../store/category/categorySlice.js'
import filterCategoryReducer from '../store/category/filterSlice.js'
import orderReducer from '../store/order/orderSlice.js'
export const store = configureStore({
    reducer: {
        product: productReducer,
        filter:filterReducer,
        category:categoryReducer,
        filtercategory:filterCategoryReducer,
        order:orderReducer,
      },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch