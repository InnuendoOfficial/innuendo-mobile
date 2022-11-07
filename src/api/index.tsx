import { AxiosError, AxiosResponse } from "axios";
import { loginEmail, signupEmail } from "./auth";

type APIError = {
  status: number,
  message: string
}
type APIResponse<T> = {
  data: T | null,
  error: APIError | null
}

function withErrorHandling<T extends Array<any>, U>(
  fn: (...args: T) => Promise<AxiosResponse<U, any>>
): (...args: T) => Promise<APIResponse<U>> {
  return async function(...args: T): Promise<APIResponse<U>> {
    try {
      const { data } = await fn(...args)
      return {
        data: data,
        error: null
      }
    } catch (error) {
      const err = error as AxiosError
      return {
        data: null,
        error: {
          status: err.response?.status || 404,
          message: err.response?.data?.message || "Unknown error"
        }
      }
    }
  };
}

const api = {
  auth: {
    login: withErrorHandling(loginEmail),
    signup: withErrorHandling(signupEmail)
  },
}

export type { APIError, APIResponse }
export default api