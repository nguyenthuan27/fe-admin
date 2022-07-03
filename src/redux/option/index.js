import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const optionProductSlice = createSlice({
  name: "optionProduct",
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    remove: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, remove } = optionProductSlice.actions;

export default optionProductSlice.reducer;
