import axiosAPI from "./config";

function setAccessToken(access_token: string) {
  axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
}

export { setAccessToken };
