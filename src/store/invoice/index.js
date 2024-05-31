import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    invoices: [],
    invoice: {},
    filterBy: "filterless",
    loading: true,
};

export const getInvoices = createAsyncThunk(
    "invoice/getInvoices",
    async (invoiceIDs) => {
        const res = await fetch("http://localhost:3005/invoices");
        if (!res.ok) throw new Error("bad connection");
        const data = await res.json();
        const selectedInvoices = data.filter((invoice) =>
            invoiceIDs.includes(invoice.id)
        );
        return selectedInvoices;
    }
);

export const postInvoice = createAsyncThunk(
    "invoice/postInvoice",
    async (invoice) => {
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
        setLoading: (state) => {
            state.loading = true;
        },
        setFilterBy: (state, action) => {
            state.filterBy = action.payload;
        },

        selectInvoice: (state, action) => {
            state.invoice = action.payload;
            state.loading = false;
        },

        setInvoices: (state, action) => {
            state.invoices = action;
            state.loading = false;
        },
    },

    extraReducers: (builder) => {
        // getInvoices
        builder.addCase(getInvoices.fulfilled, (state, action) => {
            state.invoices = action.payload;
            state.loading = false;
        });

        builder.addCase(getInvoices.rejected, (state, action) => {
            action.error.message === "bad connection"
                ? toast.error("Bad connection")
                : toast.error("Something went wrong");
        });

        // postInvoice
        builder.addCase(postInvoice.fulfilled, (state, action) => {
            state.invoices = [...state.invoices, action.payload];
            state.loading = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const invoiceActions = counterSlice.actions;

export default counterSlice.reducer;
