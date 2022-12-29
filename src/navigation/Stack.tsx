import React from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StackParamList } from './types'
import { navigationTheme } from '../theme';

import LoginScreen from '../screens/auth/Login';
import SignUpScreen from '../screens/auth/SignUp';
import TabsNavigation from './Tabs';
import EditReportScreen from '../screens/EditReport';
import EditReportCategoryScreen from '../screens/EditReportCategory';
import ShareReportChooseSymptomsScreen from '../screens/ShareReportChooseSymptoms';
import { useColorModeValue } from 'native-base';
import Logo from '../components/NavHeader/Logo';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  return (
    <NavigationContainer theme={useColorModeValue(DefaultTheme, DarkTheme)}>
      <Stack.Navigator screenOptions={options}>
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }}/>
        <Stack.Screen name="EditReport" component={EditReportScreen}/>
        <Stack.Screen name="EditReportCategory" component={EditReportCategoryScreen}/>
        <Stack.Screen name="ShareReportChooseSymptoms" component={ShareReportChooseSymptomsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const options: NativeStackNavigationOptions = {
  headerTintColor: 'white', // White go back button
  headerTitle: () => <Logo />,
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#776CCB"
  },
  headerBackTitleVisible: false
}

export default StackNavigation