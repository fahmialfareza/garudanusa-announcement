import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import { CountdownState } from "../types";

const initialState: CountdownState = {
  error: null,
  isSuccess: false,
};

const countdownSlicer = createSlice({
  name: "countdown",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
});

export const { setError, setIsSuccess } = countdownSlicer.actions;

export const selectCountdown = (state: RootState) => state.countdown;

export default countdownSlicer.reducer;
