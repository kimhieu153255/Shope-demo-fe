import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";
import MessageSlice from "./MessageSlice";

const reducer = combineReducers({
  auth: AuthSlice,
  cart: CartSlice,
  message: MessageSlice,
});

const store = configureStore({
  reducer,
});

export default store;
