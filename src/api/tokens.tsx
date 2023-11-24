import { storeUserSessionToStorage } from "../storage";
import { AuthTokens } from "../types/auth";
import axiosAPI from "./config";

const refreshAccessToken = async (refresh_token: string) => {
  try {
    const { data } = await axiosAPI.request<AuthTokens>({
      method: "GET",
      url: "/token/refresh",
      params: {
        refresh_token
      }
    })
    if (data) {
      setAccessToken(data.access_token)
      await storeUserSessionToStorage('', data)
    }
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}

function setAccessToken(access_token: string) {
  axiosAPI.defaults.headers.common.Authorization = `Bearer ${access_token}`;
}

export { setAccessToken, refreshAccessToken };
