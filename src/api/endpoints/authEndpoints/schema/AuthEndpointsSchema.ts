export type UserRoles = 'user' | 'admin';
export interface IUser {
  _id: string;
  name: string;
  role: UserRoles;
}

export interface LoginData {
  name: string;
  password: string;
}