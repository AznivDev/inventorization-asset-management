import { userAdapter, userRoleAdapter } from "../data/adapters/user";
import { IUserModel, IUserRoleModel } from "../data/models/user";
import { axiosInstance } from "../utils/axios";

export interface ICreateUserPayload {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: number;
}

export interface IUpdateUserPayload {
  id: number;
  name: string;
  lastname: string;
  email: string;
}

// Admin Services
export const allUsers = () =>
  axiosInstance({ auth: true })
    .get("/admin/users")
    .then((res): IUserModel[] => {
      if (!res) throw new Error();

      if (res.data && !res.data.length) return [];

      return res.data.map((request: any) => userAdapter(request));
    });

export const allRoles = () =>
  axiosInstance({ auth: true })
    .get("/admin/roles")
    .then((res): IUserRoleModel[] => {
      if (!res) throw new Error();

      if (res.data && !res.data.length) return [];

      return res.data.map((request: any) => userRoleAdapter(request));
    });

export const createUser = (user: ICreateUserPayload) =>
  axiosInstance({ auth: true })
    .post("/admin/users", user)
    .then((res): IUserModel => {
      if (!res) throw new Error();

      return userAdapter(res.data);
    });

export const bulkDeleteUsers = (ids: number[]) =>
  axiosInstance({ auth: true })
    .delete("/admin/users", { data: { ids } })
    .then((res) => {
      if (!res) throw new Error();
    });

export const updateUser = (user: IUpdateUserPayload) =>
  axiosInstance({ auth: true })
    .put(`/admin/users/${user.id}`, user)
    .then((res): IUserModel => {
      if (!res) throw new Error();

      return userAdapter(res.data);
    });
