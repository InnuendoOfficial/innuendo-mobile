import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackNavProp, TabParamList } from "./types";
import LogoWithTitle from "../components/NavHeader/LogoWithTitle";

import HomeScreen from "../screens/Tabs/Home";
import CalendarScreen from "../screens/Tabs/Calendar";
import ShareReportScreen from "../screens/Tabs/ShareReport";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Linking } from "react-native";
import { Center, Heading, HStack, Icon, useColorModeValue } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator<TabParamList>();

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const getIcon = (
  { focused, color, size }: TabBarIconProps,
  iconName: string
): React.ReactNode => (
  <Center bgColor={focused ? "#776CCB" : "white"} padding={1.5} borderRadius={11}>
    <Ionicons
      name={`${iconName}-outline`}
      size={size}
      color={color}
    />
  </Center>
);

function Settings() {
  const navigation = useNavigation<StackNavProp>();
  const goToSettings = () => navigation.push("Settings");
  const color = useColorModeValue("#3C3B40", "white");

  return (
    <TouchableOpacity onPress={goToSettings}>
      <Icon
        as={MaterialIcons}
        name="settings"
        size="xl"
        color={color}
      />
    </TouchableOpacity>
  );
}

function Help() {
  const docsURL = ""
  const openDocs = () => Linking.openURL(docsURL);

  return (
    <TouchableOpacity onPress={openDocs}>
      <Icon
        as={MaterialIcons}
        name="help"
        size="xl"
        color={"#3C3B40"}
      />
    </TouchableOpacity>
  );
}

function ShareCode() {
  const navigation = useNavigation<StackNavProp>();
  const goToShareCode = () => navigation.push("ShareCode");
  const color = useColorModeValue("#3C3B40", "white");

  return (
    <TouchableOpacity onPress={goToShareCode}>
      <Icon
        as={FontAwesome}
        name="share"
        size="xl"
        color={color}
      />
    </TouchableOpacity>
  );
}

function TabsNavigation() {
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => getIcon(props, "home"),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: (props) => getIcon(props, "calendar"),
        }}
      />
    </Tab.Navigator>
  );
}

const options: BottomTabNavigationOptions = {
  headerTitle: () => undefined,
  headerStyle: {
    backgroundColor: "transparent"
  },
  headerRight: () => (
    <HStack space={4} marginRight={4}>
      {/* <Help /> */}
      <ShareCode />
      <Settings />
    </HStack>
  ),
  tabBarShowLabel: false,
  tabBarStyle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 2,
    borderTopWidth: 2,
    borderColor: "transparent",
    padding: 2,
  },
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "#3C3B40"
};

export default TabsNavigation;
