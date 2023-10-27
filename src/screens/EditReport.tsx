import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Button, HStack, Heading, Icon, Spinner, VStack } from "native-base";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EditReportProps } from "./types";
import useEditedReportStore from "../store/useEditedReport";
import SymptomsPanel from "../components/SymptomsPanel";
import ScrollScreenView from "../components/ScrollScreenView";
import useReportMutation from "../hooks/useReportsMutation";
import useSymptoms from "../hooks/useSymptoms";
import NetworkView from "../components/NetworkView";

function EditReportScreen({ navigation }: EditReportProps) {
  const report = useEditedReportStore((state) => state.report);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const createReportMutation = useReportMutation("create", queryClient);
  const editReportMutation = useReportMutation("edit", queryClient);
  const { isLoading, data, refetch } = useSymptoms();
  const symptoms = data?.data || [];

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
    <NetworkView
      isLoading={isLoading}
      skeleton={<Spinner accessibilityLabel="Chargement des symptômes..." />}
      data={data}
      errorTitle={"Erreur pendant le chargement des symptômes"}
      refetch={refetch}
      render={
      <ScrollScreenView>
        <VStack space="lg" alignItems={"center"}>
          <HStack space={2}>
            <Icon
              as={Ionicons}
              name="calendar-outline"
              size="xl"
              color={"black"}
            />
            <Heading color="black" textAlign="center">
              {moment(report.date).format("dddd D MMMM Y").charAt(0).toUpperCase()
              + moment(report.date).format("dddd D MMMM Y").slice(1)}
            </Heading>
          </HStack>
          <SymptomsPanel symptoms={symptoms} />
          <Button size="lg" isLoading={isSaving} onPress={saveReport}>
            Valider le rapport
          </Button>
        </VStack>
      </ScrollScreenView>}
    />
  )
}

export default EditReportScreen;
