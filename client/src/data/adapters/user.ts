import { dateParser } from "../../utils/parser";
import { IUserModel } from "../models/user";
import { IUserRoleModel } from "../models/user";

export const userRoleAdapter = (data: any): IUserRoleModel => {
  if (!data) throw new Error("No data provided to userRoleAdapter");

  const { id, name, access_level } = data;

  if (!id || !name || !access_level) throw new Error("Invalid data provided to userRoleAdapter");

  const adaptedRole: IUserRoleModel = {
    id,
    name,
    accessLevel: access_level,
  };

  return adaptedRole;
};

export const userAdapter = (data: any): IUserModel => {
  if (!data) throw new Error("No data provided to userAdapter");

  const { id, email, username, name, lastname, createdAt, role } = data;
  const { id: roleId, name: roleName, access_level } = role;

  if (!id || !email || !username || !name || !lastname || !createdAt || !role || !roleId || !roleName || !access_level)
    throw new Error("Invalid data provided to userAdapter");

  const adaptedRole: IUserRoleModel = userRoleAdapter({
    id: roleId,
    name: roleName,
    access_level: access_level,
  });

  const adaptedUser: IUserModel = {
    id,
    name,
    lastname,
    username,
    email,
    createdAt: dateParser(createdAt),
    avatar: `https://robohash.org/${username}`,
    role: adaptedRole,
  };

  return adaptedUser;
};
