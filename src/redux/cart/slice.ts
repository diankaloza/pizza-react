import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { I_CartSlice, T_CartItem } from "redux/cart/types";
import { RootState } from "redux/store";
import { isTemplateExpression } from "typescript";
import { calcTotalPrice } from "utils/calcTotalPrice";
import { getCartFromLS } from "utils/getCartfromLS";

const { items, totalPrice } = getCartFromLS();

export const initialState: I_CartSlice = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<T_CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<T_CartItem>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice =
        state.totalPrice - action.payload.price * action.payload.count;
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
