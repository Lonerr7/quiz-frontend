import {API_TAGS, apiSlice} from "@/api/slice/api";
import type {SuccessResponse} from "@/api/schema/ResponseSchema";

const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void>({
      query: () => '/users/me',
      transformResponse: (response: SuccessResponse<{user: IUser}>) => response?.data.user,
      providesTags: [API_TAGS.ME]
    }),
    logIn: builder.mutation<IUser, LoginData>({
      query: (loginData) => ({
        url: '/auth/logIn',
        method: 'POST',
        body: loginData,
      }),
      invalidatesTags: [API_TAGS.ME]
    }),
    logOut: builder.mutation<undefined, void>({
      query: () => ({
        url: '/auth/logOut',
        method: 'POST'
      }),
      invalidatesTags: [API_TAGS.ME]
    })
  }),
});


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

export const {useGetMeQuery, useLogInMutation, useLogOutMutation} = authEndpoints;