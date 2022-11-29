import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type TabParamList = {
  Home: undefined,
  Calendar: undefined,
  Endoscore: undefined,
  ReportShare: undefined
}

type StackParamList = {
  Login: undefined,
  SignUp: undefined,
  Tabs: undefined,
  EditReport: { reportDate: string },
  EditReportCategory: { reportDate: string, categoryName: string } // ex:  "2022-01-01", "Menstruations"
}

type StackNavProp = NativeStackNavigationProp<StackParamList>
type TabNavProp = BottomTabNavigationProp<TabParamList>

export type {
  TabParamList,
  StackParamList,
  StackNavProp,
  TabNavProp
}