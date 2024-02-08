import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/User";
import { userDetailsSlice } from "../features/UserDetails";
import { loadingSlice } from "../features/Loader";
import { ProductSlice } from "../features/Products";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    loading: loadingSlice.reducer,
    products: ProductSlice.reducer,
  },
});
