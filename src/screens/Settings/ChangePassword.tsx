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
import { ChangePasswordScreenProps } from "../types";
import FeatherIcon from "react-native-vector-icons/Feather";
import useAuthStore from "../../store/auth";

function ChangePasswordScreen({ navigation }: ChangePasswordScreenProps) {
  //const [feedbackText, setFeedbackText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const email = useAuthStore((state) => state.auth.email);

  const changePassword = async () => {
    setIsSending(true);
    const { error } = await api.auth.resetPassword(email);
    setIsSending(false);
    if (!error) {
      navigation.goBack();
    }
  };

  return (
    <ScreenView>
      <VStack space={4} alignItems="center">
        <Heading>Changement de mot de passe</Heading>
        <Text textAlign="center">
          Cliquez sur le bouton ci-dessous pour recevoir un lien de
          réinitialisation par e-mail et mettre à jour votre mot de passe en
          toute sécurité.
        </Text>
        <FeatherIcon
          color="#776CCB"
          name="key"
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
          isLoading={isSending}
        >
          <Text bold style={{ color: "white", fontSize: 15 }}>
            Recevoir un lien de réinitialisation
          </Text>
        </Button>
      </VStack>
    </ScreenView>
  );
}

export default ChangePasswordScreen;
