import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {
    email: "",
    token: "",
    username: "",
    phone: "",
    primary_address: "",
    secondary_address: "",
    pincode: "",
  },
};

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    saveuserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { saveuserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
