import React from "react";
import { Alert, Box, Button, Heading, HStack, Text, VStack } from "native-base";
import ScreenView from "../../components/ScreenView";

function EndoscoreScreen() {
  return (
    <ScreenView style={{ justifyContent: "space-between" }}>
      <Heading fontSize="4xl" alignSelf="flex-start">
        Endoscore
      </Heading>
      <VStack space={2} bgColor="white" borderRadius={20} alignItems="center" padding={4}>
        <Heading fontSize="6xl">
          8.0 / 10
        </Heading>
        <Text fontSize="lg">
          Dernière génération: 2 juillet 2022
        </Text>
        <Alert w="100%" status={"warning"} variant="subtle" borderRadius={20}>
          <VStack space={1}>
            <HStack space={2}>
              <Alert.Icon />
              <Heading bold fontSize="2xl">
                Analyse
              </Heading>
            </HStack>
            <Text fontSize="md" color="coolGray.800">
              Il est recommandé de consulter un professionnel en lui montrant ce score
            </Text>
          </VStack>
        </Alert>
      </VStack>
      <Button>
        Evaluer a nouveau
      </Button>
    </ScreenView>
  )
}

export default EndoscoreScreen