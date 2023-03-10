import { createSlice } from "@reduxjs/toolkit";

import { IMonitoringAssetType } from "../../data/models/monitoring";
import { PayloadAction } from "./../../../node_modules/@reduxjs/toolkit/src/createAction";
import {
  IMonitoringCountsPayload,
  IMonitoringRequestsCountsPayload,
} from "./../../services/monitoringService";

interface IState {
  counts?: IMonitoringCountsPayload;
  requestsCounts?: IMonitoringRequestsCountsPayload;
  types?: IMonitoringAssetType[];
}

const INITIAL_STATE: IState = {};

export const monitoringSlice = createSlice({
  name: "monitoring",
  initialState: INITIAL_STATE,
  reducers: {
    setMonitoringCounts: (
      state,
      action: PayloadAction<IMonitoringCountsPayload>
    ) => {
      state.counts = action.payload;
    },
    setMonitoringRequestsCounts: (
      state,
      action: PayloadAction<IMonitoringRequestsCountsPayload>
    ) => {
      state.requestsCounts = action.payload;
    },
    setMonitoringAssetTypes: (
      state,
      action: PayloadAction<IMonitoringAssetType[]>
    ) => {
      state.types = action.payload;
    },
  },
});

export const {
  setMonitoringCounts,
  setMonitoringRequestsCounts,
  setMonitoringAssetTypes,
} = monitoringSlice.actions;

export default monitoringSlice.reducer;
