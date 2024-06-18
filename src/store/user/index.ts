import { type TUserData } from "@/types/types";
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CustomError {
    message?: string;
}

const initialState: TUserData = {
    fullName: "",
    email: "",
    invoiceIDs: [],
    avatarURL: "",
};

export const getUserData = createAsyncThunk(
    "user/getUserData",
    async (id: string) => {
        const res = await fetch(`http://localhost:3005/users/${id}`);
        if (!res.ok) throw new Error("bad connection");
        const data = await res.json();
        return data;
    }
);

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<TUserData>) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.invoiceIDs = action.payload.invoiceIDs;
            state.avatarURL = action.payload.avatarURL;
        },

        addInvoiceID: (state, action: PayloadAction<string>) => {
            state.invoiceIDs = [...state.invoiceIDs, action.payload];
        },
    },
    extraReducers: (builder) => {
        // getUserData
        builder.addCase(
            getUserData.fulfilled,
            (state, action: PayloadAction<TUserData>) => {
                state.invoiceIDs = action.payload.invoiceIDs;
                state.avatarURL = action.payload.avatarURL;
            }
        );

        builder.addCase(
            getUserData.rejected,
            (
                _state,
                action: PayloadAction<unknown, string, unknown, CustomError>
            ) => {
                console.log(action.error);
                action.error.message === "bad connection"
                    ? toast.error("Bad connection")
                    : toast.error("couldn't get user data");
            }
        );
    },
});

export const userActions = counterSlice.actions;

export default counterSlice.reducer;
