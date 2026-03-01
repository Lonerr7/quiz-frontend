import {API_TAGS, apiSlice} from "@/api/slice/api";
import type {SuccessResponse} from "@/api/schema/ResponseSchema";

const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IUser | undefined, void>({
      providesTags: [API_TAGS.ME],
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const {data, error} = await baseQuery({
          url: '/users/me',
        });

        if (error) {
          return {data: undefined}
        }

        const successResponse = data as SuccessResponse<{user: IUser}>;
        return {data: successResponse.data.user};
      },
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