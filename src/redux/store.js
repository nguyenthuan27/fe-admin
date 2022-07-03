import { configureStore } from "@reduxjs/toolkit";

import optionProductReducer from "./option/index";

export const store = configureStore({
  reducer: {
    optionProduct: optionProductReducer,
  },
});
