import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { metaReducer } from "./slices/metaSlices";
import { stateReducer } from "./slices/stateSlices";

const makeStore = () =>
  configureStore({
    reducer: {
      [metaReducer.name]: metaReducer.reducer,
      [stateReducer.name]: stateReducer.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);