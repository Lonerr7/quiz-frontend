import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/config/app/AppConfig";

export const API_TAGS = {
  ME: 'Me'
} as const;

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL, credentials: 'include'});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [API_TAGS.ME]
});