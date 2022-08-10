import React from 'react';
import moment from 'moment';
import { Button, Heading, VStack } from 'native-base';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackParamList, TabParamList } from '../navigation/types';
import SymptomCategoriesPanel from '../components/SymptomCategoriesPanel';
import ScreenView from '../components/ScreenView';

type Props = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditReport'>,
  BottomTabScreenProps<TabParamList>
>

function EditReportScreen({ route, navigation }: Props) {
  const { reportDate } = route.params

  return (
    <ScreenView style={{ justifyContent: 'center' }}>
      <VStack space="lg">
        <Heading color="black" textAlign="center">
          Rapport du { "\n" + moment(reportDate).format('dddd DD MMMM Y') }
        </Heading>
        <SymptomCategoriesPanel reportDate={reportDate} />
        <Button size="lg" onPress={() => navigation.goBack()}>
          Confirmer le rapport
        </Button>
      </VStack>
    </ScreenView>
  )
}

export default EditReportScreen