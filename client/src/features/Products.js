import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    allproducts: (state,action) => {
      state.products = action.payload
    },
  },
});

export const { allproducts } = ProductSlice.actions;

export default ProductSlice.reducer;

