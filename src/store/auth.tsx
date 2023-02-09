import EncryptedStorage from "react-native-encrypted-storage";
import create from "zustand";
import api from "../api";
import { storeUserSessionToStorage } from "../storage";
import { AuthTokens, AuthState } from "../types/auth"

interface AuthStore {
  auth: AuthState,
  editAuth: (authState: AuthState) => void
  signIn: (authTokens: AuthTokens) => Promise<boolean>,
  signOut: () => Promise<boolean>
}

const useAuthStore = create<AuthStore>()((set) => ({
  auth: {
    isLoading: true,
    isSignedIn: false,
    isSignout: false,
    isFirstTimeUsingApp: true
  },
  editAuth: (authState) => set(() => ({
    auth: {...authState}
  })),
  signIn: async (authTokens) => {
    if (!await storeUserSessionToStorage(authTokens)) {
      return false
    }
    api.tokens.setAccessToken(authTokens.access_token)
    set((state) => ({
      auth: {
        ...state.auth,
        isSignedIn: true,
        isSignout: false
      }
    }))
    return true
  },
  signOut: async () => {
    try {
      await EncryptedStorage.removeItem("user_session")
    } catch (error) {
      console.error(error)
      return false
    }
    set((state) => ({
      auth: {
        ...state.auth,
        isSignedIn: false,
        isSignout: true
      }
    }))
    return true
  }
}))

export default useAuthStore