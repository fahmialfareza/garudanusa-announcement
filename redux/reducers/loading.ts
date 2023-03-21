import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import { LoadingState } from "../types";

const initialState: LoadingState = {
  loading: false,
};

const loadingSlicer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlicer.actions;

export const selectLoading = (state: RootState) => state.loading;

export default loadingSlicer.reducer;
