import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/User";
import { loadingSlice } from "../features/Loader";
import { ProductSlice } from "../features/Products";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loading: loadingSlice.reducer,
    products: ProductSlice.reducer,
  },
});
