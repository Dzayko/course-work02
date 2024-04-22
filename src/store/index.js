import { configureStore } from "@reduxjs/toolkit";
import urlScanReducer from "./urlScanSlice";

export default configureStore({
  reducer: {
    urlReportStore: urlScanReducer,
  },
});
