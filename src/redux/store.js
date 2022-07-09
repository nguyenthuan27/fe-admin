import { configureStore } from "@reduxjs/toolkit";

import optionProductReducer from "./option";

export const store = configureStore({
  reducer: {
    optionProduct: optionProductReducer,
  },
});
