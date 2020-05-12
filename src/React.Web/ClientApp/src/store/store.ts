import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import productsReducer from './products'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
