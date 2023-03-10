import { ReduxAction } from "../../common/interfaces";
import { ILoginArgs, ILoginPayload, authLogin } from "../../services/authService";
import { authSelf } from "../../services/authService";
import { setToken } from "../../utils/common";
import { removeToken } from "../../utils/common";
import store from "../store";
import { IUpdatePasswordArgs, authUpdatePassword } from "./../../services/authService";
import { login, logout } from "./reducer";

const { dispatch } = store;

export const dispatchAuthLoginAction = async (args: ILoginArgs) => {
  return authLogin(args).then(async (token) => {
    setToken(token);

    const payload: ILoginPayload = await authSelf();

    return dispatch(login(payload));
  });
};

export const dispatchAutologinAction = async () => {
  authSelf().then(async (payload) => dispatch(login(payload)));
};

export const dispatchAuthLogoutAction = (): ReduxAction<{}> => {
  removeToken();
  return dispatch(logout());
};

export const dispatchAuthUpdatePasswordAction = async (args: IUpdatePasswordArgs) => {
  return authUpdatePassword(args).then(async (_) => dispatchAuthLogoutAction());
};
