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
import ScreenView from "../../components/ScreenView";
import { useForm, Controller } from "react-hook-form";
import { ChangeEmailScreenProps } from "../types";
import { AuthForm } from "../../api/auth";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type NewEmailForm = { newEmail: string };

function ChangeEmailScreen({ navigation }: ChangeEmailScreenProps) {
  const { control, handleSubmit, setError, setValue } = useForm<NewEmailForm>(
    {}
  );

  const [isLoading, setIsLoading] = useState(false);
  const sendNewEmail = async (form: NewEmailForm) => {
    setIsLoading(true);
    const { error } = await api.auth.resetEmail(form.newEmail);
    setIsLoading(false);
    if (error) {
      // refer to API docs for status values
      setError("newEmail", { type: "validate", message: error.message });
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScreenView>
      <VStack space={4} alignItems="center">
        <Heading>Changement d'adresse email</Heading>
        <Text textAlign="center">
          Veuillez entrer la nouvelle adresse e-mail que vous souhaitez associer
          à votre compte et ensuite cliquez sur le bouton confirmer.
        </Text>
        <FeatherIcon
          color="#776CCB"
          name="mail"
          style={{
            alignSelf: "center",
          }}
          size={55}
        />

        <FormControl isRequired>
          <FormControl.Label>Nouvelle adresse e-mail</FormControl.Label>
          <Controller
            control={control}
            name="newEmail"
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="example@gmail.com"
                autoCapitalize="none"
                borderRadius="9"
                borderColor="primary.500"
                fontSize="14"
                onBlur={() => setValue("newEmail", value.trim())}
                onChangeText={onChange}
                value={value}
                InputLeftElement={
                  <Icon
                    size="sm"
                    color="primary.500"
                    ml={4}
                    as={<MaterialCommunityIcons name="email-outline" />}
                  />
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: "Une adresse e-mail est requise",
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "L'adresse e-mail est invalide",
              },
            }}
          />
        </FormControl>

        <Button
          rounded="lg"
          size="lg"
          w="100%"
          fontWeight="bold"
          onPress={handleSubmit(sendNewEmail)}
          isLoading={isLoading}
        >
          <Text bold style={{ color: "white", fontSize: 15 }}>
            Mettre à jour l'addresse e-mail
          </Text>
        </Button>
      </VStack>
    </ScreenView>
  );
}

export default ChangeEmailScreen;
