import React from "react";
import { Alert, Center, Heading, Spinner, Text, VStack } from "native-base";
import ScreenView from "../components/ScreenView";
import useEndoscore from "../hooks/useEndoscore";
import moment from "moment";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import EndoscoreButton from "../components/EndoscoreButton";
import EndoscoreCircularProgress from "../components/EndoscoreCircularProgress";

function EndoscoreScreen() {
  const { data, isLoading } = useEndoscore();
  const endoscore = data?.data;

  return (
    <ScreenView>
      <Heading bold fontSize={40} alignSelf="flex-start" color="#3C3B40">
        Endoscore
      </Heading>
      <Text marginTop={4} fontSize="md" alignSelf="flex-start">
        L'endoscore est un indicateur du risque d'entrométriose selon les
        symptômes que vous avez renseigner sur cette application.
      </Text>
      <VStack
        flex={1}
        space={2}
        justifyContent="space-around"
        padding={4}
      >
        {isLoading ? (
          <Spinner accessibilityLabel="Chargement de l'endoscore" />
        ) : !endoscore ? (
          <Text textAlign="center">Aucun endoscore pour le moment</Text>
        ) : (
          <VStack>
            <Center>
              <EndoscoreCircularProgress endoscore={endoscore} />
            </Center>
            <Alert
              w="100%"
              status={endoscore.score < 5 ? "success" : "warning"}
              variant="subtle"
              borderRadius={20}
            >
              <VStack space={1}>
                <Heading bold fontSize="xl">
                  Analyse
                </Heading>
                <Text fontSize="sm" color="coolGray.800">
                  {endoscore.score < 5
                    ? "Rien ne semble indiquer une présence d'endométriose."
                    : "Il est recommandé de consulter un professionnel en lui montrant ce score."}
                </Text>
              </VStack>
            </Alert>
          </VStack>
        )}
        <Center>
          <EndoscoreButton />
        </Center>
      </VStack>
    </ScreenView>
  );
}

export default EndoscoreScreen;
