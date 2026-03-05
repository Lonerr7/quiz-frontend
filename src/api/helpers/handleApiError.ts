import {toast} from "sonner";
import {isFetchBaseQueryError} from "./defineApiErrorType";
import type {ErrorResponse} from "@/api/schema/ResponseSchema.ts";

export const handleApiError = (err: unknown) => {
  if (isFetchBaseQueryError(err)) {
    const apiError= err.data as ErrorResponse;
    toast.error(apiError.message);
  }
}
