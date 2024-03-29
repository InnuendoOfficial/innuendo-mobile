import AsyncStorage from "@react-native-async-storage/async-storage";
import LogRocket from '@logrocket/react-native';
import EncryptedStorage from "react-native-encrypted-storage";
import OneSignal from 'react-native-onesignal';
import api from "../api";
import { create } from "zustand";
import { storeUserSessionToStorage } from "../storage";
import { AuthTokens, AuthState } from "../types/auth";

interface AuthStore {
  auth: AuthState;
  editAuth: (authState: AuthState) => void;
  setAppIntroPassed: () => Promise<void>;
  signIn: (email: string, authTokens: AuthTokens) => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

const useAuthStore = create<AuthStore>()((set) => ({
  auth: {
    email: '',
    isLoading: true,
    isSignedIn: false,
    isFirstTimeUsingApp: true,
  },
  editAuth: (authState) =>
    set(() => ({
      auth: { ...authState },
    })),
  setAppIntroPassed: async () => {
    await AsyncStorage.setItem("intro_passed", "yes");
    set((state) => ({
      auth: {
        ...state.auth,
        isFirstTimeUsingApp: false,
      },
    }));
  },
  signIn: async (email, authTokens) => {
    if (!(await storeUserSessionToStorage(email, authTokens))) {
      return false;
    }
    LogRocket.identify(email)
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      if (response === true) {
        OneSignal.getDeviceState()
          .then(async (deviceState) => {
            if (deviceState === null) {
              return;
            }
            const { userId } = deviceState;
            const { error } = await api.auth.saveDeviceId(userId);
            if (error) {
              console.log(error);
            }
          })
          .catch((error) => {
            console.log(
              "Erreur lors de la récupération du Player ID OneSignal:",
              error
            );
          });
      }
    });
    api.tokens.setAccessToken(authTokens.access_token);
    set((state) => ({
      auth: {
        ...state.auth,
        email: email,
        isSignedIn: true,
      },
    }));
    return true;
  },
  signOut: async () => {
    try {
      await EncryptedStorage.removeItem("user_session");
    } catch (error) {
      console.error(error);
      return false;
    }
    set((state) => ({
      auth: {
        ...state.auth,
        isSignedIn: false,
      },
    }));
    return true;
  },
}));

export default useAuthStore;
