import {
  ICreateUserPayload,
  IUpdateUserPayload,
  allRoles,
  allUsers,
  bulkDeleteUsers as bulkDeleteService,
  createUser,
  updateUser as updateService,
} from "../../services/usersService";
import store from "../store";
import { addUser, bulkDeleteUsers, setRoles, setUsers, updateUser } from "./reducer";

const { dispatch } = store;

// Admin Actions
export const dispatchAllUsersAction = () => allUsers().then(async (payload) => dispatch(setUsers(payload)));

export const dispatchAllRolesAction = () => allRoles().then(async (payload) => dispatch(setRoles(payload)));

export const dispatchCreateUserAction = (user: ICreateUserPayload) =>
  createUser(user).then(async (payload) => dispatch(addUser(payload)));

export const dispatchBulkDeleteUsersAction = (ids: number[]) =>
  bulkDeleteService(ids).then(async () => dispatch(bulkDeleteUsers(ids)));

export const dispatchUpdateUserAction = (user: IUpdateUserPayload) =>
  updateService(user).then(async (payload) => dispatch(updateUser(payload)));
