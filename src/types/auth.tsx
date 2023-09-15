type AuthTokens = {
  access_token: string;
  expires_in: number; // seconds
};

type AuthStorage = {
  email: string,
  access_token: string;
  expire_timestamp: number;
};

type AuthState = {
  email: string,
  isLoading: boolean;
  isSignedIn: boolean;
  isFirstTimeUsingApp: boolean;
};

export type { AuthTokens, AuthStorage, AuthState };
