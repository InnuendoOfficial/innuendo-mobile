import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Alert, Button, Heading, HStack, Spinner, Text, VStack } from "native-base";
import ScreenView from "../../components/ScreenView";
import useEndoscore from "../../hooks/useEndoscore";
import moment from "moment";
import useEndoscoreMutation from "../../hooks/useEndoscoreMutation";

function EndoscoreScreen() {
  const { data, isLoading } = useEndoscore()
  const endoscore = data?.data
  const [isGenerating, setIsGenerating] = useState(false)
  const queryClient = useQueryClient()
  const createEndoscoreMutation = useEndoscoreMutation(queryClient)

  const generateNewEndoscore = async () => {
    setIsGenerating(true)
    await createEndoscoreMutation.mutateAsync()
    setIsGenerating(false)
  }

  return (
    <ScreenView style={{ justifyContent: "space-between" }}>
      <Heading fontSize="4xl" alignSelf="flex-start">
        Endoscore
      </Heading>
      <VStack space={2} bgColor="white" borderRadius={20} alignItems="center" padding={4}>
        <Heading key="indicateur" fontSize="lg" textAlign="center">
          L'endoscore est un indicateur du risque d'entrométriose selon les symptômes que vous
          avez renseigner sur cette application.
        </Heading>
        {
          isLoading ? (
            <Spinner accessibilityLabel="Chargement de l'endoscore"/>
          ) : !endoscore ? (
            <Heading textAlign="center">
              Aucun endoscore pour le moment
            </Heading>
          ) : (
            <>
              <Heading fontSize="6xl">
                { endoscore.score } / 10
              </Heading>
              <Text fontSize="lg" textAlign="center">
                Mise à jour: { "\n" + moment(endoscore.created_at).format("LLL") }
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
            </>
          )
        }
      </VStack>
      <Button isLoading={isGenerating} onPress={generateNewEndoscore}>
        Évaluer
      </Button>
    </ScreenView>
  )
}

export default EndoscoreScreen