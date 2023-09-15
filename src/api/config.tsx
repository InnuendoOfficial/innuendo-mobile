import axios from "axios";
import Config from "react-native-config";

const axiosAPI = axios.create({
  baseURL: Config.API_URL || "https://innuendo-webapi.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
  timeoutErrorMessage: "Server timed out",
});

export default axiosAPI;
