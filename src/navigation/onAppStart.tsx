import { AuthState } from "../types/auth";
import api from "../api";
import { isAppIntroPassed, retrieveUserSessionFromStorage } from "../storage";

async function retrieveAuthFromStorage(): Promise<AuthState> {
  const introIsPassed = await isAppIntroPassed();
  const session = await retrieveUserSessionFromStorage();

  api.tokens.setAccessToken(session?.access_token || "");
  return {
    email: session?.email || '',
    isLoading: false,
    isSignedIn: session !== undefined,
    isFirstTimeUsingApp: !introIsPassed,
  };
}

export { retrieveAuthFromStorage };
