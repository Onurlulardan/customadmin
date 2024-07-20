import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageHeader: null,
};

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        setPageHeader: (state, action) => {
            state.pageHeader = action.payload;
        },
    },
});

export const { setPageHeader } = rootSlice.actions;

export default rootSlice.reducer;