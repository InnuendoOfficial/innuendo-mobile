import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackParamList, TabParamList } from '../navigation/types';

type EditReportProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditReport'>,
  BottomTabScreenProps<TabParamList>
>

type EditReportCategoryProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditReportCategory'>,
  BottomTabScreenProps<TabParamList>
>

export type {
  EditReportProps,
  EditReportCategoryProps
}