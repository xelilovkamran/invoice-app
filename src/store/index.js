import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "@/store/invoice/index";
import userReducer from "@/store/user/index";
import themeReducer from "@/store/theme/index";

export const store = configureStore({
    reducer: {
        invoice: invoiceReducer,
        user: userReducer,
        theme: themeReducer,
    },
});
