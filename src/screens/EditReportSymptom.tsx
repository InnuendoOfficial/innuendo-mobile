import React, { useState } from "react";
import { Button } from "native-base";
import { EditReportSymptomProps } from './types';
import ScreenView from "../components/ScreenView";
import SymptomInput from "../components/SymptomInput";
import useEditedReportStore from "../store/useEditedReport";
import useReportMutation from "../hooks/useReportsMutation";
import { useQueryClient } from "react-query";

function EditReportSymptomScreen({ route, navigation } : EditReportSymptomProps) {
  const report = useEditedReportStore((state) => state.report)
  const [isSaving, setIsSaving] = useState(false)
  const queryClient = useQueryClient()
  const createReportMutation = useReportMutation('create', queryClient)
  const editReportMutation = useReportMutation('edit', queryClient)

  const saveReport = async () => {
    const isNewReport = (report.id === 0)
    setIsSaving(true)
    const { error } = (isNewReport)
      ? await createReportMutation.mutateAsync(report)
      : await editReportMutation.mutateAsync(report)
    setIsSaving(false)
    if (error) {
      console.error(error)
      return
    }
  }
  const validate = async () => {
    // substrings transform from 2023-04-12T19:04:01.716Z to 2023-04-12
    const reportDateIsToday = report.date.substring(0, 10) === new Date().toISOString().substring(0, 10)
    if (reportDateIsToday) {
      // only save if report is today because of home page panel, otherwise its saved by another screen
      await saveReport()
    }
    navigation.goBack()
  }

  return (
    <ScreenView>
      <SymptomInput symptomName={route.params.symptomName} />
      <Button size="lg" isLoading={isSaving} width="100%" mt={4} onPress={async () => await validate()}>
        Valider
      </Button>
    </ScreenView>
  )
}

export default EditReportSymptomScreen