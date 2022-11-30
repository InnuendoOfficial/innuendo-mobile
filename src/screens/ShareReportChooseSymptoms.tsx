import React, { useState } from "react";
import { Button, Checkbox, Heading } from "native-base";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackParamList, TabParamList } from "../navigation/types";
import ScreenView from "../components/ScreenView";
import SymptomCategories from '../conf/SymptomCategories';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type ShareReportChooseSymptomsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'ShareReportChooseSymptoms'>,
  BottomTabScreenProps<TabParamList>
>

function ShareReportChooseSymptomsScreen({ navigation } : ShareReportChooseSymptomsScreenProps) {
  const [sharedSymptoms, setSharedSymptoms] = useState<string[]>(SymptomCategories.map(symptomCategory =>
    symptomCategory.name
  ));
  const goBackWithSharedSymptoms = () => navigation.navigate("ShareReport", {
    sharedSymptoms: sharedSymptoms
  })

  return (
    <ScreenView style={{ justifyContent: "space-around" }}>
      <Heading>
        Choisir les symptômes
      </Heading>
      <Checkbox.Group defaultValue={sharedSymptoms} accessibilityLabel="Choisisissez vos symptômes">
        {
          SymptomCategories.map(symptomCategory =>
            <Checkbox key={symptomCategory.name} value={symptomCategory.name} my={2} defaultIsChecked>
              { symptomCategory.name }
            </Checkbox>
          )
        }
      </Checkbox.Group>
      <Button onPress={goBackWithSharedSymptoms}>
        Confirmer
      </Button>
    </ScreenView>
  )
}

export default ShareReportChooseSymptomsScreen