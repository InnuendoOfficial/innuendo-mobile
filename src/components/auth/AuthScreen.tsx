import React from "react";
import { Text, Heading, VStack, Center, HStack, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../../navigation/types";
import AuthEmailPassword from "../../components/auth/EmailPassword";
import LogoRound from "../../assets/logos/round.png";

function AuthScreen({ action }: { action: "login" | "signUp" }) {
  const navigation = useNavigation<StackNavProp>();
  const goToOtherAction = () =>
    navigation.navigate(action === "login" ? "SignUp" : "Login");

    
  return (
    <Center w="100%" flex={1} bgColor="red">
      <VStack safeArea space={6} w="80%" px={2} py={8} alignItems="center">
        <HStack space={4}>
          <Image source={LogoRound} alt="Innuendo" size="sm" />
          <Heading size="xl" color="primary.400">
            {action === "login" ? "Connexion" : "Inscription"}
          </Heading>
        </HStack>
        <AuthEmailPassword action={action} />
        <Text textAlign="center">
          {(action === "login"
            ? "Pas encore de compte ?"
            : "Déjà un compte ?") + " "}
          <Text color="tertiary.400" bold underline onPress={goToOtherAction}>
            {action === "login" ? "S'inscrire" : "Se connecter"}
          </Text>
        </Text>
      </VStack>
    </Center>
  );
}

export default AuthScreen;
