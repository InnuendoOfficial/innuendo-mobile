import {
  Button,
  Heading,
  Text,
  FormControl,
  VStack,
  Input,
  Icon,
} from "native-base";
import React, { useState, useRef } from "react";
import api from "../../api";
import { useForm, Controller } from "react-hook-form";
import ScreenView from "../../components/ScreenView";
import { DeleteDataScreenProps } from "../types";
import FeatherIcon from "react-native-vector-icons/Feather";

function DeleteDataScreen({ navigation }: DeleteDataScreenProps) {
  // const [feedbackText, setFeedbackText] = useState("");
  // const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const changePassword = async () => {};

  return (
    <ScreenView>
      <VStack space={4} alignItems="center">
        <Heading>Suppression des données</Heading>
        <Text textAlign="center">
          Pour supprimer toutes les données liées à vos rapports, appuyez sur le
          bouton ci-dessous. Veuillez noter que cette action entraînera la
          suppression permanente de vos rapports.
        </Text>
        <FeatherIcon
          color="#776CCB"
          name="database"
          style={{
            alignSelf: "center",
          }}
          size={55}
        />
        <Button
          rounded="lg"
          size="lg"
          w="100%"
          fontWeight="bold"
          onPress={changePassword}
        >
          <Text bold style={{ color: "white", fontSize: 15 }}>
            Supprimer
          </Text>
        </Button>
      </VStack>
    </ScreenView>
  );
}

export default DeleteDataScreen;
