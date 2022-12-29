import React, { useEffect, useState } from "react";
import { Button, Checkbox, Heading, Spinner } from "native-base";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackParamList, TabParamList } from "../navigation/types";
import ScrollScreenView from "../components/ScrollScreenView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import useSymptoms from "../hooks/useSymptoms";
import api from '../api'

type ShareReportChooseSymptomsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'ShareReportChooseSymptoms'>,
  BottomTabScreenProps<TabParamList>
>

function ShareReportChooseSymptomsScreen({ navigation } : ShareReportChooseSymptomsScreenProps) {
  const { data, isLoading } = useSymptoms()
  const symptoms = data?.data
  const [sharedSymptoms, setSharedSymptoms] = useState<string[]>([])

  useEffect(() => {
    if (symptoms) {
      setSharedSymptoms(symptoms.map(symptom => symptom.name))
    }
  }, [data])
  const shareSymptoms = async () => {
    if (!symptoms) {
      return
    }
    const APIsharedSymptoms = symptoms.map(symptom => ({
      symptom_id: symptom.id,
      showable: sharedSymptoms.includes(symptom.name)
    }))
    const { data, error } = await api.symptoms.share(APIsharedSymptoms)
    if (!error) {
      navigation.navigate("ShareReport", { accessCode: data.code })
    }
  }

  return (
    <ScrollScreenView style={{ justifyContent: "space-around" }}>
      <Heading textAlign="center">
        Choisissez les symptômes que vous souhaitez partager
      </Heading>
      {
        !symptoms ? (
          <Spinner accessibilityLabel="Chargement des symptômes" />
        ) : (
          <Checkbox.Group
            onChange={setSharedSymptoms}
            defaultValue={symptoms.map(symptom => symptom.name)}
            accessibilityLabel="Choisisissez vos symptômes"
          >
            {
              symptoms.map(symptom =>
                <Checkbox key={symptom.name} value={symptom.name} my={2}>
                  { symptom.name }
                </Checkbox>
              )
            }
          </Checkbox.Group>
        )
      }
      <Button disabled={isLoading} onPress={shareSymptoms}>
        Confirmer
      </Button>
    </ScrollScreenView>
  )
}

export default ShareReportChooseSymptomsScreen