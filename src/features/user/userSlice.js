import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
});

// console.log(cartSlice);

export default userSlice.reducer;
