import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserApi } from "../services/UserService";
import { AxiosError } from "axios";
import { LoginRequest } from "../types/LoginRequest";

export const loginUser = createAsyncThunk(
  "users/login",
  async (loginRequest: LoginRequest, { rejectWithValue }) => {
    try {
      return await loginUserApi(loginRequest);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.message || error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

const initialState = {};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (_state, action) => {
      localStorage.setItem("token", action.payload.token);
    });
  },
});

export default usersSlice.reducer;
