import { store } from "@/store/index.js";
import { userActions } from "@/store/user/index.js";

export const setUserData = (userData) =>
    store.dispatch(userActions.setUserData(userData));

export const addInvoiceID = (invoiceID) =>
    store.dispatch(userActions.addInvoiceID(invoiceID));
