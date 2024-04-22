import { createSlice } from "@reduxjs/toolkit";

const urlScanSlice = createSlice({
  name: "urlReportStore",
  initialState: {
    url: "",
    urlReport: {},
  },
  reducers: {
    saveReport(state, action) {
      state.urlReport = action.payload.report;
    },
    saveUrl(state, action) {
      state.url = action.payload.url;
    },
  },
});

export const { saveReport, saveUrl } = urlScanSlice.actions;
export default urlScanSlice.reducer;
