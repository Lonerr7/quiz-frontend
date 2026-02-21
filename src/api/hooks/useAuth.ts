import {useGetMeQuery} from "@/api/endpoints/authEndpoints.ts";

export const useAuth = () => {
  return useGetMeQuery(undefined, {
    selectFromResult: ({data, isError, isLoading}) => {
      return {
        me: !isLoading && !isError ? data : undefined,
        isLoading,
      }
    },
  });
}