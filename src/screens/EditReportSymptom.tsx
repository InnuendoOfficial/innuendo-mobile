import React, { useState } from "react";
import { Button } from "native-base";
import { EditReportSymptomProps } from "./types";
import ScreenView from "../components/ScreenView";
import SymptomInput from "../components/SymptomInput";
import useEditedReportStore from "../store/useEditedReport";
import useReportMutation from "../hooks/useReportsMutation";
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
    const isFromHomepage = navigation.getState().routes.length === 2;

    if (isFromHomepage) {
      // save report only if we are editing from the homepage
      await saveReport();
    }
    navigation.goBack();
  };

  return (
    <ScreenView>
      <SymptomInput symptomName={route.params.symptomName} />
      <Button
        size="lg"
        isLoading={isSaving}
        width="100%"
        mt={4}
        onPress={async () => await validate()}
      >
        Valider
      </Button>
    </ScreenView>
  );
}

export default EditReportSymptomScreen;
