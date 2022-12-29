import { AxiosError, AxiosResponse } from "axios";
import { loginEmail, signupEmail } from "./auth";
import { setAccessToken } from "./tokens";
import { getSymptoms, shareSymptoms } from "./symptoms"
import { createEndoscore, getEndoscore } from "./endoscore";
import { createReport, editReport, getReports } from "./reports";

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
  reports: {
    create: withErrorHandling(createReport),
    get: withErrorHandling(getReports),
    edit: withErrorHandling(editReport),
    delete: withErrorHandling(editReport)
  },
  endoscore: {
    get: withErrorHandling(getEndoscore),
    create: withErrorHandling(createEndoscore)
  },
  tokens: {
    setAccessToken: setAccessToken
  }
}

function withErrorHandling<T extends Array<any>, U>(
  fn: (...args: T) => Promise<AxiosResponse<U, any>>
): (...args: T) => Promise<APIResponse<U>> {
  return async function(...args: T): Promise<APIResponse<U>> {
    api.tokens.setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvdG9AZ21haWwuY29tIiwiaWF0IjoxNjcyMzY3Njk4LCJleHAiOjE2NzIzNzEyOTh9.wU2Ovi735CREGkY2x8G5ongaZWIbxZuaUTT3RiT65Vs")
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