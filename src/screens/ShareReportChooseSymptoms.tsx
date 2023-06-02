import React, { useEffect, useState } from "react";
import { Button, Checkbox, Heading, Spinner } from "native-base";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackParamList, TabParamList } from "../navigation/types";
import ScrollScreenView from "../components/ScrollScreenView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import useSymptoms from "../hooks/useSymptoms";
import api from "../api";
import NetworkView from "../components/NetworkView";

type ShareReportChooseSymptomsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "ShareReportChooseSymptoms">,
  BottomTabScreenProps<TabParamList>
>;

function ShareReportChooseSymptomsScreen({
  navigation,
}: ShareReportChooseSymptomsScreenProps) {
  const { data, isLoading, refetch } = useSymptoms();
  const symptoms = data?.data || [];
  const [sharedSymptoms, setSharedSymptoms] = useState<string[]>([]);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (symptoms) {
      setSharedSymptoms(symptoms.map((symptom) => symptom.name));
    }
  }, [data]);

  const shareSymptoms = async () => {
    if (!symptoms) {
      return;
    }
    const APIsharedSymptoms = symptoms.map((symptom) => ({
      symptom_id: symptom.id,
      showable: sharedSymptoms.includes(symptom.name),
    }));
    setIsSharing(true);
    const { data, error } = await api.symptoms.share(APIsharedSymptoms);
    setIsSharing(false);
    if (!error) {
      navigation.navigate("ShareReport", { accessCode: data.code });
    }
  };

  const SymptomList = () => (
    <>
      <Checkbox.Group
        onChange={setSharedSymptoms}
        // defaultValue={symptoms.map(symptom => symptom.name)}
        value={sharedSymptoms}
        accessibilityLabel="Choisisissez vos symptômes"
      >
        {symptoms.map((symptom, index) => (
          <Checkbox
            key={symptom.name + index.toString()}
            value={symptom.name}
            my={2}
          >
            {symptom.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Button
        disabled={isLoading}
        isLoading={isSharing}
        onPress={shareSymptoms}
      >
        Confirmer
      </Button>
    </>
  );

  return (
    <ScrollScreenView style={{ justifyContent: "space-around" }}>
      <Heading textAlign="center">
        Choisissez les symptômes que vous souhaitez partager
      </Heading>
      <NetworkView
        isLoading={isLoading}
        skeleton={<Spinner accessibilityLabel="Chargement des symptômes" />}
        data={data}
        errorTitle="Erreur pendant le chargement du calendrier"
        refetch={refetch}
        render={<SymptomList />}
      />
    </ScrollScreenView>
  );
}

export default ShareReportChooseSymptomsScreen;
