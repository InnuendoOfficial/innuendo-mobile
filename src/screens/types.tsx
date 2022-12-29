import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackParamList, TabParamList } from '../navigation/types';

type EditReportProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditReport'>,
  BottomTabScreenProps<TabParamList>
>

type EditReportSymptomProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditReportSymptom'>,
  BottomTabScreenProps<TabParamList>
>

export type {
  EditReportProps,
  EditReportSymptomProps
}