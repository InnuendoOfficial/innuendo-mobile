import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Button, Heading, VStack } from "native-base";
import moment from "moment";
import { EditReportProps } from "./types";
import useEditedReportStore from "../store/useEditedReport";
import SymptomsPanel from "../components/SymptomsPanel";
import ScrollScreenView from "../components/ScrollScreenView";
import useReportMutation from "../hooks/useReportsMutation";

function EditReportScreen({ navigation }: EditReportProps) {
  const report = useEditedReportStore((state) => state.report);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const createReportMutation = useReportMutation("create", queryClient);
  const editReportMutation = useReportMutation("edit", queryClient);

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
    navigation.goBack();
  };

  return (
    <ScrollScreenView>
      <VStack space="lg">
        <Heading color="black" textAlign="center">
          Rapport du {"\n" + moment(report.date).format("dddd DD MMMM Y")}
        </Heading>
        <SymptomsPanel />
        <Button size="lg" isLoading={isSaving} onPress={saveReport}>
          Confirmer le rapport
        </Button>
      </VStack>
    </ScrollScreenView>
  );
}

export default EditReportScreen;
