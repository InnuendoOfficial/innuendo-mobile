type AuthTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number; // seconds
};

type AuthStorage = Omit<AuthTokens, "expires_in"> & {
  email: string,
  expire_timestamp: number;
};

type AuthState = {
  email: string,
  isLoading: boolean;
  isSignedIn: boolean;
  isFirstTimeUsingApp: boolean;
};

export type { AuthTokens, AuthStorage, AuthState };
