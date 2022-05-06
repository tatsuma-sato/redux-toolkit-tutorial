import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: cartItems.length,
  total: 0,
  isLoading: true,
  isError: false,
  errorMessage: "",
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cleatCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId;
      });
      state.amount = state.cartItems.length;
    },
    increase: (state, { payload }) => {
      const itemId = payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount++;
    },
    decrease: (state, { payload }) => {
      const itemId = payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount--;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        const itemTotal = item.amount * item.price;
        total += itemTotal;
        amount += item.amount;
      });
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

// console.log(cartSlice);

export const { cleatCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
