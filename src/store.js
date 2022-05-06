import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    modal: modalReducer,
  },
});
