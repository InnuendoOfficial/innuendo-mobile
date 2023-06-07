import React, { useState } from "react";
import { useQueryClient } from "react-query";
import {
  Alert,
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "native-base";
import ScreenView from "../../components/ScreenView";
import useEndoscore from "../../hooks/useEndoscore";
import moment from "moment";
import useEndoscoreMutation from "../../hooks/useEndoscoreMutation";
import { AnimatedCircularProgress } from "react-native-circular-progress";

function EndoscoreScreen() {
  const { data, isLoading } = useEndoscore();
  const endoscore = data?.data;
  const [isGenerating, setIsGenerating] = useState(false);
  const queryClient = useQueryClient();
  const createEndoscoreMutation = useEndoscoreMutation(queryClient);

  const generateNewEndoscore = async () => {
    setIsGenerating(true);
    await createEndoscoreMutation.mutateAsync();
    setIsGenerating(false);
  };

  return (
    <ScreenView>
      <Heading bold fontSize={40} alignSelf="flex-start" color="#3C3B40">
        Endoscore
      </Heading>
      <Text marginTop={4} fontSize="md" textAlign="justify">
        L'endoscore est un indicateur du risque d'entrométriose selon les
        symptômes que vous avez renseigner sur cette application.
      </Text>
      {
        isLoading ? (
          <Spinner accessibilityLabel="Chargement de l'endoscore" />
        ) : (
          <VStack
            flex={1}
            space={2}
            justifyContent="space-between"
            alignItems="center"
            padding={4}
          >
            { !endoscore ? (
              <Text textAlign="center">
                Aucun endoscore pour le moment
              </Text>
            ) : (
              <>
                <AnimatedCircularProgress
                  size={200}
                  width={15}
                  fill={endoscore.score * 10}
                  tintColor="#00ff00"
                  tintColorSecondary="#ff0000"
                  backgroundColor="#D9D9D9"
                  arcSweepAngle={240}
                  rotation={240}
                  lineCap="round"
                >
                  {
                    (fill) => (
                      <>
                        <Heading bold fontSize={40}>
                          { Math.round(endoscore.score) }
                        </Heading>
                        <Text fontSize="sm" textAlign="center" color="#67647D">
                          {moment(endoscore.created_at).format("Do MMMM")}
                        </Text>
                      </>
                    )
                  }
                </AnimatedCircularProgress>
                <Alert
                  w="100%"
                  status={endoscore.score < 5 ? "success" : "warning"}
                  variant="subtle"
                  borderRadius={20}
                >
                  <VStack space={1}>
                    <HStack space={2}>
                      <Alert.Icon />
                      <Heading bold fontSize="xl">
                        Analyse
                      </Heading>
                    </HStack>
                    <Text fontSize="sm" color="coolGray.800" >
                      { endoscore.score < 5 ? "Rien ne semble indiquer une présence d'endométriose."
                      : "Il est recommandé de consulter un professionnel en lui montrant ce score."}
                    </Text>
                  </VStack>
                </Alert>
              </>
            )}
            <Button width="75%" isLoading={isGenerating} onPress={generateNewEndoscore}>
              <Text fontFamily="heading" bold fontSize={14} color="white" letterSpacing={2} textAlign="center">
                EVALUER
              </Text>
            </Button>
          </VStack>
        )
      }
    </ScreenView>
  );
}

export default EndoscoreScreen;
