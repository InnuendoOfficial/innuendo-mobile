import React from 'react';
import moment from 'moment';
import { Button, Heading, VStack } from 'native-base';
import { EditReportProps } from './types'
import SymptomCategoriesPanel from '../components/SymptomCategoriesPanel';
import ScreenView from '../components/ScreenView';

function EditReportScreen({ route, navigation }: EditReportProps) {
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