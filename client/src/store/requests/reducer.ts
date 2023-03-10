import { createSlice } from "@reduxjs/toolkit";

import { IRequestModel } from "../../data/models/requests";
import { PayloadAction } from "./../../../node_modules/@reduxjs/toolkit/src/createAction";
import { TRequestStatus } from "./../../data/models/requests";

interface IState {
  requests: IRequestModel[];
}

const INITIAL_STATE: IState = {
  requests: [],
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState: INITIAL_STATE,
  reducers: {
    setRequests: (state, action: PayloadAction<IRequestModel[]>) => {
      state.requests = action.payload;
    },
    addRequest: (state, action: PayloadAction<IRequestModel>) => {
      state.requests.push(action.payload);
    },
    bulkDeleteRequests: (state, action: PayloadAction<number[]>) => {
      const ids = action.payload;
      state.requests = state.requests.filter((request) => !ids.includes(request.id));
    },
    bulkChangeRequestsStatus: (state, action: PayloadAction<{ ids: number[]; status: TRequestStatus }>) => {
      const { ids, status } = action.payload;

      state.requests = state.requests.map((request) => {
        if (ids.includes(request.id)) request.status = status;

        return request;
      });
    },
  },
});

export const { setRequests, addRequest, bulkDeleteRequests, bulkChangeRequestsStatus } = requestsSlice.actions;

export default requestsSlice.reducer;
