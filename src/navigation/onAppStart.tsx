import { AuthState } from "../types/auth";
import api from "../api";
import { isAppIntroPassed, retrieveUserSessionFromStorage } from "../storage";

async function retrieveAuthFromStorage(): Promise<AuthState> {
  const introIsPassed = await isAppIntroPassed();
  const session = await retrieveUserSessionFromStorage();

  api.tokens.setAccessToken(session?.access_token || "");
  return {
    isLoading: false,
    isSignedIn: session !== undefined,
    isFirstTimeUsingApp: !introIsPassed,
  };
}

export { retrieveAuthFromStorage };
