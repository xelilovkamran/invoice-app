import { AppDispatch } from "@/store/index";
import { invoiceActions } from "@/store/invoice/index";
import { type TInvoice, type TInvoiceStatus } from "@/types/types";
import { useDispatch } from "react-redux";
import { getInvoices, postInvoice } from "@/store/invoice/index";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useInvoiceActions = () => {
    const dispatch = useAppDispatch();

    const setFilterBy = (filterBy: TInvoiceStatus | "filterless") =>
        dispatch(invoiceActions.setFilterBy(filterBy));

    const selectInvoice = (invoice: TInvoice) =>
        dispatch(invoiceActions.selectInvoice(invoice));

    const setInvoices = (invoices: TInvoice[]) =>
        dispatch(invoiceActions.setInvoices(invoices));

    const getInvoicesAction = (invoiceIDs: string[]) =>
        dispatch(getInvoices(invoiceIDs));

    const postInvoiceAction = (invoice: TInvoice) =>
        dispatch(postInvoice(invoice));

    return {
        setFilterBy,
        selectInvoice,
        setInvoices,
        getInvoicesAction,
        postInvoiceAction,
    };
};
