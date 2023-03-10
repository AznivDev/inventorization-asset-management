import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/src/createAction";

import { IUserModel, IUserRoleModel } from "../../data/models/user";

interface IState {
  roles: IUserRoleModel[];
  users: IUserModel[];
}

const INITIAL_STATE: IState = {
  roles: [],
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    setUsers: (state, action: PayloadAction<IUserModel[]>) => {
      state.users = action.payload;
    },
    setRoles: (state, action: PayloadAction<IUserRoleModel[]>) => {
      state.roles = action.payload;
    },
    addUser: (state, action: PayloadAction<IUserModel>) => {
      state.users.push(action.payload);
    },
    bulkDeleteUsers: (state, action: PayloadAction<number[]>) => {
      state.users = state.users.filter((user) => !action.payload.includes(user.id));
    },
    updateUser: (state, action: PayloadAction<IUserModel>) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[userIndex] = action.payload;
    },
  },
});

export const { setUsers, setRoles, addUser, bulkDeleteUsers, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
