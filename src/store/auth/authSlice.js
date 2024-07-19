import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, postRequest } from "../../utils/service";

const initalState = {
    user: null,
    error: null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initalState,
    reducers: {
        login: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(Login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(Login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(Login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(Register.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(Register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(Register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const Login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        const response = await postRequest(`${baseUrl}/auth/login`, JSON.stringify(data));

        if (response.error) {
            return rejectWithValue(response.error);
        }
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const Register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
    try {
        const response = await postRequest(`${baseUrl}/auth/register`, JSON.stringify(data));

        if (response.error) {
            return rejectWithValue(response.error);
        }
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const { login, loginSuccess, loginFailed } = authSlice.actions;

export default authSlice.reducer;