import { type TInvoice, type TInvoiceStatus } from "@/types/types";
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CustomError {
    message?: string;
}

type InvoiceState = {
    invoices: TInvoice[];
    invoice: null | TInvoice;
    filterBy: TInvoiceStatus | "filterless";
};

const initialState: InvoiceState = {
    invoices: [],
    invoice: null,
    filterBy: "filterless",
};

export const getInvoices = createAsyncThunk(
    "invoice/getInvoices",
    async (invoiceIDs: string[]) => {
        const res = await fetch("http://localhost:3005/invoices");
        if (!res.ok) throw new Error("bad connection");
        const data = await res.json();
        const selectedInvoices = data.filter((invoice: TInvoice) =>
            invoiceIDs.includes(invoice.id)
        );

        return selectedInvoices;
    }
);

export const postInvoice = createAsyncThunk(
    "invoice/postInvoice",
    async (invoice: TInvoice) => {
        const res = await fetch("http://localhost:3005/invoices", {
            method: "POST",
            body: JSON.stringify(invoice),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("bad connection");
        const data = await res.json();
        return data;
    }
);

export const counterSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        setFilterBy: (
            state,
            action: PayloadAction<TInvoiceStatus | "filterless">
        ) => {
            state.filterBy = action.payload;
        },

        selectInvoice: (state, action: PayloadAction<TInvoice>) => {
            state.invoice = action.payload;
        },

        setInvoices: (state, action: PayloadAction<TInvoice[]>) => {
            state.invoices = action.payload;
        },
    },

    extraReducers: (builder) => {
        // getInvoices
        builder.addCase(
            getInvoices.fulfilled,
            (state, action: PayloadAction<TInvoice[]>) => {
                state.invoices = action.payload;
            }
        );

        builder.addCase(
            getInvoices.rejected,
            (
                _state,
                action: PayloadAction<unknown, string, unknown, CustomError>
            ) => {
                action.error.message === "bad connection"
                    ? toast.error("Bad connection")
                    : toast.error("Something went wrong");
            }
        );

        // postInvoice
        builder.addCase(
            postInvoice.fulfilled,
            (state, action: PayloadAction<TInvoice>) => {
                state.invoices = [...state.invoices, action.payload];
            }
        );
    },
});

export const invoiceActions = counterSlice.actions;

export default counterSlice.reducer;
