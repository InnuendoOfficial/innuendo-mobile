import { Button, Heading, Text, VStack } from "native-base";
import React, { useState } from "react";
import api from "../../api";
import ScreenView from "../../components/ScreenView";
import { DeleteAccountScreenProps } from "../types";
import useAuthStore from "../../store/auth";

function DeleteAccountScreen({ navigation }: DeleteAccountScreenProps) {
  const signOut = useAuthStore((state) => state.signOut);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const deleteAccount = async () => {
    setIsDeletingAccount(true);
    const { error } = await api.auth.deleteAccount();
    setIsDeletingAccount(false);
    if (!error) {
      signOut();
    }
  };

  return (
    <ScreenView>
      <VStack space={5} alignItems="center">
        <Heading>Suppression du compte</Heading>
        <Text textAlign="center">
          Vous êtes sur le point d'entamer le processus de désactivation de
          votre compte. Cela signifie que vous ne serez plus en mesure de vous
          connecter à Innuendo de manière permanente.
        </Text>
        <Text textAlign="center">
          En choisissant cette option, vous supprimerez définitivement votre
          compte ainsi que toutes les données qui y sont associées. Cela
          signifie que nous n'aurons plus accès à vos rapports personnelles.
        </Text>
        <Button
          rounded="lg"
          size="lg"
          w="100%"
          bgColor="danger.600"
          marginTop="9"
          fontWeight="bold"
          onPress={deleteAccount}
          isLoading={isDeletingAccount}
          isLoadingText="Suppression du compte..."
        >
          <Text bold style={{ color: "white", fontSize: 15 }}>
            Supprimer mon compte
          </Text>
        </Button>

      </VStack>
    </ScreenView>
  );
}

export default DeleteAccountScreen;
