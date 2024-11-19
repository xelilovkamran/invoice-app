import { configureStore } from "@reduxjs/toolkit";

import invoiceReducer from "@/store/invoice/index";
import themeReducer from "@/store/theme/index";
import userReducer from "@/store/user/index";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    user: userReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
