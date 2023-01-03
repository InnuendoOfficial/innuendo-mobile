import * as React from 'react';
import { Text, Button, Spinner, Box } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { StackNavProp } from '../navigation/types';
import useSymptoms from '../hooks/useSymptoms';
import { APISymptomType } from "../api/symptoms"
import useEditedReportStore from '../store/useEditedReport';

function SymptomButton({ symptom }: { symptom: APISymptomType }) {
  const navigation = useNavigation<StackNavProp>()
  const report = useEditedReportStore((state) => state.report)

  return (
    <Button
      flex={1}
      minWidth={100}
      maxWidth={100}
      height={100}
      borderRadius={10}
      marginBottom={4}
      justifyContent="center"
      alignItems="center"
      bg={report.symptoms.find(existingSymptom =>
        existingSymptom.symptom_type_name === symptom.name) ? "primary.200" : "primary.400"
      }
      onPress={() => navigation.push('EditReportSymptom', {
        symptomName: symptom.name
      })}
    >
      <Text bold fontSize={15} color="white" textAlign="center">
        { symptom.name }
      </Text>
    </Button>
  )
}

function SymptomsPanel() {
  const { data } = useSymptoms()
  const symptoms = data?.data

  if (!symptoms) {
    return (
      <Spinner accessibilityLabel='Chargement des symptômes...'/>
    )
  }

  return (
    <Box width="100%" justifyContent="space-around" flexDirection="row" flexWrap="wrap">
      {
        symptoms.map(symptom =>
          <SymptomButton key={symptom.name} symptom={symptom} />
        )
      }
    </Box>
  )
}

export default SymptomsPanel