import { AxiosError, AxiosResponse } from "axios";
import { loginEmail, signupEmail } from "./auth";
import { setAccessToken } from "./tokens";
import { getSymptoms, shareSymptoms } from "./symptoms"

type APIError = {
  status: number,
  message: string
}
type APIResponse<T> = {
  data: T | null,
  error: APIError | null
}

const api = {
  auth: {
    login: withErrorHandling(loginEmail),
    signup: withErrorHandling(signupEmail)
  },
  symptoms: {
    get: withErrorHandling(getSymptoms),
    share: withErrorHandling(shareSymptoms)
  },
  tokens: {
    setAccessToken: setAccessToken
  }
}

function withErrorHandling<T extends Array<any>, U>(
  fn: (...args: T) => Promise<AxiosResponse<U, any>>
): (...args: T) => Promise<APIResponse<U>> {
  return async function(...args: T): Promise<APIResponse<U>> {
    api.tokens.setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaWF0IjoxNjcyMzUzNzMyLCJleHAiOjE2NzIzNTczMzJ9.zuDb-F6mQZ2ytjI6bl3QXdQAiTl6udIgjeilArCCeDs")
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

export type { APIError, APIResponse }
export default api