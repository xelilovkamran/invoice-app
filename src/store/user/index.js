import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    invoiceIDs: [],
    avatarURL: "",
};

export const getUserData = createAsyncThunk("user/getUserData", async (id) => {
    const res = await fetch(`http://localhost:3005/users/${id}`);
    if (!res.ok) throw new Error("bad connection");
    const data = await res.json();
    return data;
});

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.invoiceIDs = action.payload.invoiceIDs;
            state.avatarURL = action.payload.avatar;
        },

        addInvoiceID: (state, action) => {
            state.invoiceIDs = [...state.invoiceIDs, action.payload];
        },
    },
    extraReducers: (builder) => {
        // getUserData
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.invoiceIDs = action.payload.invoiceIDs;
            state.avatarURL = action.payload.avatar;
        });

        builder.addCase(getUserData.rejected, (state, action) => {
            console.log(action.error);
            action.error.message === "bad connection"
                ? toast.error("Bad connection")
                : toast.error("couldn't get user data");
        });
    },
});

// Action creators are generated for each case reducer function
export const userActions = counterSlice.actions;

export default counterSlice.reducer;
