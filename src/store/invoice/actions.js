import { invoiceActions } from "@/store/invoice/index";
import { store } from "@/store/index";

export const setLoading = () => store.dispatch(invoiceActions.setLoading());

export const setFilterBy = (filterBy) =>
    store.dispatch(invoiceActions.setFilterBy(filterBy));

export const selectInvoice = (invoice) =>
    store.dispatch(invoiceActions.selectInvoice(invoice));

export const setInvoices = (invoices) =>
    store.dispatch(invoiceActions.setInvoices(invoices));
