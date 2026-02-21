import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/config/app/AppConfig";
import type {BaseQueryApi, FetchArgs} from "@reduxjs/toolkit/query";

export const API_TAGS = {
  ME: 'Me'
} as const;

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL, credentials: 'include'});

const baseQueryWithAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    return {data: undefined};
  }

  return result;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: [API_TAGS.ME]
});