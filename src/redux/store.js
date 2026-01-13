import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    auth: authReducer,
    payment: paymentReducer,
  },
});

export default store;
