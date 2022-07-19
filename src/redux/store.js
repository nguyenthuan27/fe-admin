import { configureStore } from "@reduxjs/toolkit";

import optionProductReducer from "./option";
import productCartReducer from "./cart";
export const store = configureStore({
  reducer: {
    optionProduct: optionProductReducer,
    productCart: productCartReducer,
  },
});
