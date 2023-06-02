import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type TabParamList = {
  Home: undefined;
  Calendar: undefined;
  Endoscore: undefined;
  ShareReport: undefined | { accessCode: string };
};

type StackParamList = {
  AppIntro: undefined;
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Tabs: undefined;
  Settings: undefined;
  Feedback: undefined;
  ViewReport: undefined;
  EditReport: undefined;
  EditReportSymptom: { symptomName: string };
  ShareReportChooseSymptoms: undefined;
};

type StackNavProp = NativeStackNavigationProp<StackParamList>;
type TabNavProp = BottomTabNavigationProp<TabParamList>;

export type { TabParamList, StackParamList, StackNavProp, TabNavProp };
