import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartProductSlice = createSlice({
  name: "productCart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter(
        (e) => e.variantId == newItem.variantId
      );
      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e) => e.variantId != newItem.variantId
        );
        state.value = [
          ...state.value,
          {
            sku_id: newItem.sku_id,
            variantId: newItem.variantId,
            name: newItem.name,
            price: newItem.toprice,
            amount: newItem.amount + duplicate[0].amount,
            totalPrice: newItem.totalPrice + duplicate[0].totalPrice,
            option: newItem.option,
          },
        ];
      } else {
        state.value = [...state.value, newItem];
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.value = state.value.filter((item) => item.variantId != id);
    },

    clear: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clear } = cartProductSlice.actions;

export default cartProductSlice.reducer;
