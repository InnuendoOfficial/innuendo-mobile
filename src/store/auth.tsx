import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from "react-native-encrypted-storage";
import OneSignal from 'react-native-onesignal';
import create from "zustand";
import api from "../api";
import { storeUserSessionToStorage } from "../storage";
import { AuthTokens, AuthState } from "../types/auth"

interface AuthStore {
  auth: AuthState,
  editAuth: (authState: AuthState) => void,
  setAppIntroPassed: () => Promise<void>,
  signIn: (authTokens: AuthTokens) => Promise<boolean>,
  signOut: () => Promise<boolean>
}

const useAuthStore = create<AuthStore>()((set) => ({
  auth: {
    isLoading: true,
    isSignedIn: false,
    isFirstTimeUsingApp: true
  },
  editAuth: (authState) => set(() => ({
    auth: {...authState}
  })),
  setAppIntroPassed: async () => {
    await AsyncStorage.setItem("intro_passed", "yes")
    set((state) => ({
      auth: {
        ...state.auth,
        isFirstTimeUsingApp: false
      }
    }))
  },
  signIn: async (authTokens) => {
    if (!await storeUserSessionToStorage(authTokens)) {
      return false
    }
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      if (response == true) {
          OneSignal.getDeviceState().then(async deviceState => {
            if (deviceState === null) {
              return 
            }
            const { userId } = deviceState;
            const { error } = await api.auth.saveDeviceId(userId);
            if (error) {
              console.log(error);
            }
          }).catch(error => {
              console.log('Erreur lors de la récupération du Player ID OneSignal:', error);
          });
      }
  });
    api.tokens.setAccessToken(authTokens.access_token)
    set((state) => ({
      auth: {
        ...state.auth,
        isSignedIn: true
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
        isSignedIn: false
      }
    }))
    return true
  }
}))

export default useAuthStore