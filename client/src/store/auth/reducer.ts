import { createSlice } from "@reduxjs/toolkit";

import { IUserModel } from "../../data/models/user";
import { ILoginPayload } from "../../services/authService";
import { PayloadAction } from "./../../../node_modules/@reduxjs/toolkit/src/createAction";

interface IState {
  user?: IUserModel;
}

const INITIAL_STATE: IState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action: PayloadAction<ILoginPayload>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
