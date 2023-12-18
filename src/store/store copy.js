
import productReducer from "../store/product/productSlice";
import filterReducer from '../store/product/filterSlice.js'
import categoryReducer from '../store/category/categorySlice.js'
import filterCategoryReducer from '../store/category/filterSlice.js'
import orderReducer from '../store/order/orderSlice.js'

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {thunk} from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  //  blacklist: ['product','filter',]
  whitelist: ["order"],
};

const rootReducer = combineReducers({
         product: productReducer,
         filter:filterReducer,
         category:categoryReducer,
         filtercategory:filterCategoryReducer,
         order:orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);
// export const store = configureStore({
//     reducer: {
//         product: productReducer,
//         filter:filterReducer,
//         category:categoryReducer,
//         filtercategory:filterCategoryReducer,
//         order:orderReducer,
//       },
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch