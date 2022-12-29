import React from "react";
import { Button, Divider, Heading, Image, Text } from "native-base";
import { EditReportSymptomProps } from './types';
import ScreenView from "../components/ScreenView";
import SymptomInput from "../components/SymptomInput";

function EditReportSymptomScreen({ route, navigation } : EditReportSymptomProps) {
  return (
    <ScreenView>
      <SymptomInput symptomId={route.params.symptomId} />
      <Button size="lg" width="100%" mt={4} onPress={() => navigation.goBack()}>
        Valider
      </Button>
    </ScreenView>
  )
}

export default EditReportSymptomScreen