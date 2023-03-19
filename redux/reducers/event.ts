import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import { EventState } from "../types";

const initialState: EventState = {
  error: null,
  isSuccess: false,
  event: null,
};

const eventSlicer = createSlice({
  name: "event",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setEvent: (state, action) => {
      state.event = action.payload;
    },
  },
});

export const { setError, setIsSuccess, setEvent } = eventSlicer.actions;

export const selectEvent = (state: RootState) => state.event;

export default eventSlicer.reducer;
