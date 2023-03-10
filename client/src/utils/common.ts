import { toast } from "react-hot-toast";

import { IUserRoleModel } from "../data/models/user";

interface IToast {
  message?: string;
  type?: "required" | "invalid";
}

export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

export const isAdmin = (role: IUserRoleModel) => {
  if (role.name === "admin" && role.accessLevel === 3) return true;
};

export const showSuccessToast = (message: string) => toast.success(message);
export const showErrorToast = (args: IToast) => {
  let message = args.message;

  switch (args.type) {
    case "required":
      message = "Fields are required";
      break;
    case "invalid":
      message = "Invalid credentials";
      break;
    default:
      break;
  }

  toast.error(message ?? "Something went wrong");
};
