import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from '../src/navigation/types';
import axiosAPI from "../src/api/config"
import LoginScreen from '../src/screens/auth/Login';
import SignUpScreen from '../src/screens/auth/SignUp';

jest.mock("../src/api/config", () => ({
  __esModule: true,
  default: {
    request: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    defaults: { headers: { common: { Authorization: "" }} },
  },
}))
jest.mock('react-native-onesignal', () => ({
  getDeviceState: jest.fn(),
  promptForPushNotificationsWithUserResponse: jest.fn()
}))

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
const Stack = createNativeStackNavigator<StackParamList>();

describe("LoginScreen", () => {
  it('renders screen with data from API', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity
        }
      }
    });
    (axiosAPI.request as jest.MockedFunction<typeof axiosAPI.request>)
      .mockResolvedValue({ data: {
        "expires_in": 3600,
        "access_token": "token"
    }});

    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </NativeBaseProvider>
    );

    await waitFor(() => expect(tree.getByText("Connexion")).toBeDefined());
    const loginButton = tree.getByText("Se connecter")
    expect(loginButton).toBeDefined();
    fireEvent.press(loginButton);

    expect(tree).toMatchSnapshot()
  });
})

describe("SignupScreen", () => {
  it('renders screen with data from API', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity
        }
      }
    });
    (axiosAPI.request as jest.MockedFunction<typeof axiosAPI.request>)
      .mockResolvedValue({ data: {
        "expires_in": 3600,
        "access_token": "token"
    }});

    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </NativeBaseProvider>
    );

    await waitFor(() => expect(tree.getByText("Connexion")).toBeDefined());
    const signupButton = tree.getByText("Créer un compte")
    expect(signupButton).toBeDefined();
    fireEvent.press(signupButton);

    expect(tree).toMatchSnapshot()
  });
})