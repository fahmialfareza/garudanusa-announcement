import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import { AnnouncementState } from "../types";

const initialState: AnnouncementState = {
  announcements: null,
  announcement: null,
  importExcel: null,
  error: null,
  isSuccess: false,
};

const announcementSlicer = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    setAnnouncements: (state, action) => {
      state.announcements = action.payload;
    },
    setAnnouncement: (state, action) => {
      state.announcement = action.payload;
    },
    setImportExcel: (state, action) => {
      state.importExcel = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
});

export const {
  setAnnouncement,
  setImportExcel,
  setError,
  setAnnouncements,
  setIsSuccess,
} = announcementSlicer.actions;

export const selectAnnouncement = (state: RootState) => state.announcement;

export default announcementSlicer.reducer;
