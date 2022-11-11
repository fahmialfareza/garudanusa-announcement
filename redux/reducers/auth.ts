import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import { AuthState } from "../types";

const initialState: AuthState = {
  users: [],
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  error: null,
  isSuccess: false,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
});

export const { setToken, setUser, setError, setUsers, setIsSuccess } =
  authSlicer.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlicer.reducer;
