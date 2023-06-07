import React, { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import useAuthStore from "../store/auth";
import { useColorModeValue } from "native-base";
import { StackParamList } from "./types";
import { retrieveAuthFromStorage } from "./onAppStart";

import Logo from "../components/NavHeader/Logo";
import SplashScreen from "../screens/Splash";
import LoginScreen from "../screens/auth/Login";
import SignUpScreen from "../screens/auth/SignUp";
import TabsNavigation from "./Tabs";
import EditReportScreen from "../screens/EditReport";
import EditReportSymptomScreen from "../screens/EditReportSymptom";
import ShareReportChooseSymptomsScreen from "../screens/ShareReportChooseSymptoms";
import ViewReportScreen from "../screens/ViewReport";
import SettingsScreen from "../screens/Settings";
import FeedbackScreen from "../screens/Feedback";
import AppIntroScreen from "../screens/AppIntro";

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  const authState = useAuthStore((state) => state.auth);
  const editAuth = useAuthStore((state) => state.editAuth);

  useEffect(() => {
    async function loadAuthState() {
      editAuth(await retrieveAuthFromStorage());
    }
    loadAuthState();
  }, []);

  return (
    <NavigationContainer theme={useColorModeValue(DefaultTheme, DarkTheme)}>
      <Stack.Navigator screenOptions={options}>
        {authState.isLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : !authState.isSignedIn ? (
          authState.isFirstTimeUsingApp ? (
            <Stack.Screen
              name="AppIntro"
              component={AppIntroScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Group
              screenOptions={{ headerShown: false, animation: "fade" }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Group>
          )
        ) : (
          <>
            <Stack.Screen
              name="Tabs"
              component={TabsNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
            <Stack.Screen name="ViewReport" component={ViewReportScreen} />
            <Stack.Screen name="EditReport" component={EditReportScreen} />
            <Stack.Screen
              name="EditReportSymptom"
              component={EditReportSymptomScreen}
            />
            <Stack.Screen
              name="ShareReportChooseSymptoms"
              component={ShareReportChooseSymptomsScreen}
              options={{ headerTitle: "Choisir les symptômes" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const options: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "heading",
    fontSize: 25,
    fontWeight: "bold",
    color: "#3C3B40"
  },
};

export default StackNavigation;
