import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackParamList, TabParamList } from "../navigation/types";

type EditReportProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "EditReport">,
  BottomTabScreenProps<TabParamList>
>;

type EditReportSymptomProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "EditReportSymptom">,
  BottomTabScreenProps<TabParamList>
>;

type SettingsScreenProps = NativeStackScreenProps<StackParamList, "Settings">;
type FeedbackScreenProps = NativeStackScreenProps<StackParamList, "Feedback">;
type DeleteAccountScreenProps = NativeStackScreenProps<StackParamList, "DeleteAccount">;
type ChangePasswordScreenProps = NativeStackScreenProps<StackParamList, "ChangePassword">;
type ChangeEmailScreenProps = NativeStackScreenProps<StackParamList, "ChangeEmail">;
type DeleteDataScreenProps = NativeStackScreenProps<StackParamList, "DeleteData">;

export type {
  EditReportProps,
  EditReportSymptomProps,
  SettingsScreenProps,
  FeedbackScreenProps,
  DeleteAccountScreenProps,
  ChangePasswordScreenProps,
  ChangeEmailScreenProps,
  DeleteDataScreenProps,
};
