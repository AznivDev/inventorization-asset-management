export interface IUserRoleModel {
  id: number;
  name: string;
  accessLevel: number;
}

export interface IUserModel {
  id: number;
  email: string;
  username: string;
  name: string;
  lastname: string;
  createdAt: string;
  avatar: string;
  role: IUserRoleModel;
}
