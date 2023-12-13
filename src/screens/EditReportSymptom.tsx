import React, { useState } from "react";
import {
  Button,
  Divider,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { EditReportSymptomProps } from "./types";
import ScreenView from "../components/ScreenView";
import SymptomInput from "../components/SymptomInput";
import useEditedReportStore from "../store/useEditedReport";
import useReportMutation from "../hooks/useReportsMutation";
import useSymptoms from "../hooks/useSymptoms";
import { useQueryClient } from "react-query";

function EditReportSymptomScreen({
  route,
  navigation,
}: EditReportSymptomProps) {
  const report = useEditedReportStore((state) => state.report);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const createReportMutation = useReportMutation("create", queryClient);
  const editReportMutation = useReportMutation("edit", queryClient);
  const { data } = useSymptoms();
  const symptoms = data?.data;

  if (!symptoms) {
    return <Spinner accessibilityLabel="Chargement des symptômes" />;
  }
  const symptom = symptoms.find(
    (symptom) => symptom.name === route.params.symptomName
  );
  if (symptom === undefined) {
    return <Heading>Impossible de trouver le symptome</Heading>;
  }

  console.log("edit report symptom")
  console.log(report)
  const saveReport = async () => {
    const isNewReport = report.id === 0;
    setIsSaving(true);
    const { error } = isNewReport
      ? await createReportMutation.mutateAsync(report)
      : await editReportMutation.mutateAsync(report);
    setIsSaving(false);
    if (error) {
      console.error(error);
      return;
    }
  };
  const validate = async () => {
    const isFromHomepage = navigation.getState().routes.length === 2; // coudln't find a better way

    if (isFromHomepage) {
      // save report only if we are editing from the homepage
      await saveReport();
    }
    navigation.goBack();
  };

  return (
    <ScreenView>
      <VStack
        flex={1}
        space={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontSize={30}>{symptom.name}</Heading>
        <Image
          width={250}
          height={250}
          source={{ uri: symptom.illustration }}
          alt={"Illustration"}
        />
        <Text fontSize={18}>{symptom.description}</Text>
      </VStack>
      <Divider marginY={4} />
      <VStack marginY={5} justifyContent="space-around">
        <SymptomInput symptomName={route.params.symptomName} />
        <Button
          size="lg"
          isLoading={isSaving}
          width="100%"
          mt={4}
          onPress={async () => await validate()}
          _text={{ fontWeight: "bold" }}
        >
          VALIDER
        </Button>
      </VStack>
    </ScreenView>
  );
}

export default EditReportSymptomScreen;
