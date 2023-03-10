import { userAdapter } from "../data/adapters/user";
import { IUserModel } from "../data/models/user";
import { axiosInstance } from "../utils/axios";

export interface ILoginPayload {
  user?: IUserModel;
}

export interface ILoginArgs {
  email: string;
  password: string;
}

export interface IUpdatePasswordArgs {
  oldPassword: string;
  password: string;
}

export const authLogin = async (args: ILoginArgs) =>
  axiosInstance()
    .post("/auth/signin", args)
    .then((res): string => {
      const { token } = res.data;

      if (!token) throw new Error();

      return token;
    });

export const authSelf = async () =>
  axiosInstance({ auth: true })
    .get("/self")
    .then((res): ILoginPayload => {
      if (!res) throw new Error();

      return { user: userAdapter(res.data) };
    });

export const authUpdatePassword = async (args: IUpdatePasswordArgs) =>
  axiosInstance({ auth: true })
    .put("/self", args)
    .then((res): void => {
      if (!res) throw new Error();
    });
