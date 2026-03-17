import {API_TAGS, apiSlice} from "@/api/slice/api";
import type {SuccessResponse} from "@/api/schema/ResponseSchema";
import type {IUser, LoginData, LoginSuccessResponse} from './schema/AuthEndpointsSchema';

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
      invalidatesTags: [API_TAGS.ME],
      transformResponse: (response: LoginSuccessResponse<{user: IUser}>) => {
        localStorage.setItem('jwt', response.token);

        return response.data.user;
      },
    }),
    logOut: builder.mutation<undefined, void>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        await baseQuery({
          url: '/auth/logOut',
          method: "POST"
        });

        localStorage.removeItem('jwt');
        return {data: undefined};
      },
      invalidatesTags: [API_TAGS.ME]
    })
  }),
});

export const {useGetMeQuery, useLogInMutation, useLogOutMutation} = authEndpoints;