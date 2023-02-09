import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavProp, TabParamList } from './types'
import LogoWithTitle from '../components/NavHeader/LogoWithTitle';

import HomeScreen from '../screens/Tabs/Home';
import CalendarScreen from '../screens/Tabs/Calendar';
import EndoscoreScreen from '../screens/Tabs/Endoscore';
import ShareReportScreen from '../screens/Tabs/ShareReport';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Icon, useColorModeValue } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator<TabParamList>();

type TabBarIconProps = {
  focused: boolean,
  color: string,
  size: number
}

const getIcon = ({ focused, color, size }: TabBarIconProps, iconName: string): React.ReactNode => (
  <Ionicons
    name={focused ? iconName : `${iconName}-outline`}
    size={size}
    color={focused ? "#776CCB" : "#AFACC6"}
  />
)

function Settings() {
  const navigation = useNavigation<StackNavProp>()
  const goToSettings = () => navigation.push('Settings')

  return (
    <TouchableOpacity onPress={goToSettings} style={{ marginRight: 20 }}>
      <Icon as={MaterialIcons} name="settings" size="xl" color={useColorModeValue("black", "white")} />
    </TouchableOpacity>
  )
}

function TabsNavigation() {
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: props => getIcon(props, 'home')
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: props => getIcon(props, 'calendar')
        }}
      />
      <Tab.Screen
        name="Endoscore"
        component={EndoscoreScreen}
        options={{
          tabBarIcon: props => getIcon(props, 'star')
        }}
      />
      <Tab.Screen
        name="ShareReport"
        component={ShareReportScreen}
        options={{
          tabBarIcon: props => getIcon(props, 'qr-code')
        }}
      />
    </Tab.Navigator>
  )
}

const options: BottomTabNavigationOptions = {
  headerStyle: {
    borderBottomWidth: 2,
    borderBottomColor: "#776CCB"
  },
  headerTitle: () => <LogoWithTitle />,
  headerTitleAlign: "center",
  tabBarShowLabel: false,
  tabBarStyle: {
    borderTopWidth: 2,
    borderTopColor: "#776CCB",
    paddingBottom: 0
  },
  headerRight: () => <Settings />
}

export default TabsNavigation