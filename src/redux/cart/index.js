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
      state.value = [...state.value, newItem];
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
