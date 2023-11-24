import { AxiosError, AxiosResponse } from "axios";
import {
  loginEmail,
  saveDeviceId,
  signupEmail,
  resetPassword,
  resetEmail,
} from "./auth";
import { refreshAccessToken, setAccessToken } from "./tokens";
import { sendFeedback } from "./feedback";
import { getSymptoms, shareSymptoms } from "./symptoms";
import { createEndoscore, getEndoscore } from "./endoscore";
import { createReport, deleteReport, editReport, getReports } from "./reports";
import { retrieveUserSessionFromStorage } from "../storage";

type APIError = {
  status: number;
  message: string;
};
type APIResponse<T> = {
  data: T | null;
  error: APIError | null;
};

const api = {
  auth: {
    login: withErrorHandling(loginEmail),
    signup: withErrorHandling(signupEmail),
    saveDeviceId: withErrorHandling(saveDeviceId),
    resetPassword: withErrorHandling(resetPassword),
    resetEmail: withErrorHandling(resetEmail),
  },
  symptoms: {
    get: withErrorHandling(getSymptoms),
    share: withErrorHandling(shareSymptoms),
  },
  reports: {
    create: withErrorHandling(createReport),
    get: withErrorHandling(getReports),
    edit: withErrorHandling(editReport),
    delete: withErrorHandling(deleteReport),
  },
  endoscore: {
    get: withErrorHandling(getEndoscore),
    create: withErrorHandling(createEndoscore),
  },
  tokens: {
    setAccessToken: setAccessToken,
  },
  sendFeedback: withErrorHandling(sendFeedback),
};

function withErrorHandling<T extends Array<any>, U>(
  fn: (...args: T) => Promise<AxiosResponse<U, any>>
): (...args: T) => Promise<APIResponse<U>> {
  return async function (...args: T): Promise<APIResponse<U>> {
    const getTodaysTimestampInSeconds = () =>
      Math.round(new Date().getTime() / 1000);
    const storage = await retrieveUserSessionFromStorage();

    if (storage && storage.expire_timestamp < getTodaysTimestampInSeconds()) {
      await refreshAccessToken(storage.access_token);
    }
    try {
      const { data } = await fn(...args);
      return {
        data: data,
        error: null,
      };
    } catch (error) {
      const err = error as AxiosError;
      return {
        data: null,
        error: {
          status: err.response?.status || 404,
          message: err.response?.data?.message || "Unknown error",
        },
      };
    }
  };
}

export type { APIError, APIResponse };
export default api;
