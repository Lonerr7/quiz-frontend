import type {SuccessResponse} from "@/api/schema/ResponseSchema.ts";

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

export interface LoginSuccessResponse<T> extends SuccessResponse<T> {
  token: string;
}