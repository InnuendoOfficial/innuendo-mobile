type AuthTokens = {
  access_token: string;
  expires_in: number; // seconds
};

type AuthStorage = {
  access_token: string;
  expire_timestamp: number;
};

type AuthState = {
  isLoading: boolean;
  isSignedIn: boolean;
  isFirstTimeUsingApp: boolean;
};

export type { AuthTokens, AuthStorage, AuthState };
