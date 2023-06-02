import axiosAPI from "./config";
import { AuthTokens } from "../types/auth";

type AuthForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const authEmail = async (action: "login" | "signup", authForm: AuthForm) =>
  axiosAPI.request<AuthTokens>({
    method: "POST",
    url: `/auth/${action}`,
    data: authForm,
  });

const loginEmail = async (authForm: AuthForm) => authEmail("login", authForm);
const signupEmail = async (authForm: AuthForm) => authEmail("signup", authForm);
const saveDeviceId = async (device_id: String) =>
  axiosAPI({
    method: "POST",
    url: "/user/device_id",
    data: {
      device_id: device_id,
    },
  });

export type { AuthForm };
export { loginEmail, signupEmail, saveDeviceId };
