import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Circle,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackParamList, TabParamList } from "../navigation/types";
import ScrollScreenView from "../components/ScrollScreenView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import useSymptoms from "../hooks/useSymptoms";
import api from "../api";
import NetworkView from "../components/NetworkView";
import { capitalize } from "../utils";

type ShareCodeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, "ShareCode">,
  BottomTabScreenProps<TabParamList>
>;

function ShareCodeScreen({ navigation }: ShareCodeScreenProps) {
  const [accessCode, setAccessCode] = useState<string>("");
  const { data, isLoading, refetch } = useSymptoms();
  const symptoms = data?.data || [];
  const [sharedSymptoms, setSharedSymptoms] = useState<string[]>([]);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (symptoms) {
      setSharedSymptoms(symptoms.map((symptom) => symptom.name));
    }
  }, [data]);

  const generateCode = async () => {
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
      setAccessCode(data.code);
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
            _light={{ bgColor: "white" }}
            _dark={{ bgColor: "#252526" }}
            width="100%"
            borderRadius={10}
            shadow="4"
            alignItems="center"
          >
            <HStack
              width="100%"
              justifyContent="space-between"
              paddingX={4}
              paddingY={2}
            >
              <HStack space={4}>
                <Circle bg="primary.400" padding={2}>
                  <Image source={{ uri: symptom.icon_url }} alt="Icon" size={4} />
                </Circle>
                <Text fontFamily="heading" bold fontSize="lg">
                  {capitalize(symptom.name)}
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

  return (
    <ScrollScreenView style={{ justifyContent: "space-around" }}>
      <VStack space={8} alignItems="center">
        <Heading bold fontSize={34} alignSelf="flex-start" _dark={{ bgColor: "#252526" }}>
          Générer un code
        </Heading>
        {accessCode !== "" ? (
          <VStack space={4} alignItems="center">
            <Text fontSize="md" textAlign="center">
              Partagez ce code avec votre praticien
            </Text>
            <Heading bold fontSize="3xl">
              {accessCode}
            </Heading>
            <Text fontSize="md" textAlign="center">
              Il est valable pendant 1 heure.
              {"\n"}
              Vous pouvez en générer un nouveau à tout moment.
            </Text>
          </VStack>
        ) : (
          <>
            <Text fontSize="md">
              Sélectionner les symptômes que vous souhaitez partager avec votre
              praticien.
            </Text>
            <NetworkView
              isLoading={isLoading}
              skeleton={
                <Spinner accessibilityLabel="Chargement des symptômes" />
              }
              data={data}
              errorTitle="Erreur pendant le chargement du calendrier"
              refetch={refetch}
              render={<SymptomList />}
            />
          </>
        )}
        {!isLoading && (
          <Button
            width="100%"
            disabled={isLoading}
            isLoading={isSharing}
            onPress={generateCode}
          >
            <Text
              fontFamily="heading"
              fontWeight="bold"
              fontSize="md"
              color="white"
              letterSpacing={1}
            >
              GENERER UN { accessCode === "" ? "" : "NOUVEAU "}CODE
            </Text>
          </Button>
        )}
      </VStack>
    </ScrollScreenView>
  );
}

export default ShareCodeScreen;
