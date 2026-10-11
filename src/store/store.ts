import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "./betsSlice";
import basketReducer from "./basketSlice";

export const store = configureStore({
  reducer: {
    bets: betsReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
