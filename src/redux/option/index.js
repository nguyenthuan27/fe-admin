import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const optionProductSlice = createSlice({
  name: "optionProduct",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      state.value = [...state.value, newItem];
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.value = state.value.filter((item) => item.id !== id);
    },

    clear: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clear } = optionProductSlice.actions;

export default optionProductSlice.reducer;
