import { type TTheme } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
    theme: TTheme;
};

const initialState: ThemeState = {
    theme: "light",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<TTheme>) => {
            state.theme = action.payload;
        },
    },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
