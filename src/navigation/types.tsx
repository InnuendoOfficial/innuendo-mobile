import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type TabParamList = {
  Home: undefined,
  Calendar: undefined,
  Endoscore: undefined,
  ShareReport: undefined | { accessCode: string }
}

type StackParamList = {
  Login: undefined,
  SignUp: undefined,
  Tabs: undefined,
  EditReport: undefined,
  EditReportSymptom: { symptomId: number },
  ShareReportChooseSymptoms: undefined
}

type StackNavProp = NativeStackNavigationProp<StackParamList>
type TabNavProp = BottomTabNavigationProp<TabParamList>

export type {
  TabParamList,
  StackParamList,
  StackNavProp,
  TabNavProp
}