import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./User";
const initialState = {
  userEmail: {},
};
export const emailSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {
    setUseremail: (state, action) => {
      state.userEmail = action.payload;
      console.log(action.payload, "Email payloaddddddddddddddddddddd");
    },
    resetEmail: (state) => {
      state.userEmail = initialState.userEmail;
    },
  },
});

export const { setUseremail, resetEmail } = emailSlice.actions;
export default emailSlice.reducer;
