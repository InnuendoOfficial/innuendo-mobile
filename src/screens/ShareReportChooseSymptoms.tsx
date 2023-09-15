import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Circle, Heading, HStack, Image, Spinner, Text, VStack } from "native-base";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackParamList, TabParamList } from "../navigation/types";
import ScrollScreenView from "../components/ScrollScreenView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import useSymptoms from "../hooks/useSymptoms";
import api from "../api";
import NetworkView from "../components/NetworkView";
import MenstruationIcon from "../assets/icons/menstruationIcon.png"

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
    <Checkbox.Group
      onChange={setSharedSymptoms}
      // defaultValue={symptoms.map(symptom => symptom.name)}
      value={sharedSymptoms}
      accessibilityLabel="Choisisissez vos symptômes"
      width="100%"
    >
      <VStack space={4}>
        {symptoms.map((symptom, index) => (
          <Box
            key={symptom.name + index.toString()}
            bgColor={"white"}
            width="100%"
            borderRadius={10}
            shadow="4"
            alignItems="center"
          >
            <HStack width="100%" justifyContent="space-between" paddingX={4} paddingY={2}>
              <HStack space={4}>
                <Circle bg="primary.400" padding={2}>
                  <Image source={MenstruationIcon} alt="Icon" size={4} />
                </Circle>
                <Text fontFamily="heading" bold fontSize='lg'>
                  {symptom.name}
                </Text>
              </HStack>
              <Checkbox
                value={symptom.name}
                accessibilityLabel={symptom.name}
              />
            </HStack>
          </Box>
        ))}
      </VStack>
    </Checkbox.Group>
  );

  console.log(sharedSymptoms)
  return (
    <ScrollScreenView style={{ justifyContent: "space-around" }}>
      <VStack space={8} alignItems="center">
        <Text bold fontSize="md">
          Sélectionner les symptômes que vous souhaitez partager avec votre pratitien.
        </Text>
        <NetworkView
          isLoading={isLoading}
          skeleton={<Spinner accessibilityLabel="Chargement des symptômes" />}
          data={data}
          errorTitle="Erreur pendant le chargement du calendrier"
          refetch={refetch}
          render={<SymptomList />}
        />
        {
          !isLoading &&
          <Button
            width="75%"
            disabled={isLoading}
            isLoading={isSharing}
            onPress={shareSymptoms}
          >
            <Text fontFamily="heading" fontWeight="bold" fontSize="md" color="white" letterSpacing={2}>
              CONFIRMER
            </Text>
          </Button>
        }
      </VStack>
    </ScrollScreenView>
  );
}

export default ShareReportChooseSymptomsScreen;
