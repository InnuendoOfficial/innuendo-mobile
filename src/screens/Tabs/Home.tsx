import React, { useCallback } from "react";
import { Heading, Spinner, Box, Text } from "native-base";
import ScrollScreenView from "../../components/ScrollScreenView";
import SymptomsPanel from "../../components/SymptomsPanel";
import useEditedReportStore from "../../store/useEditedReport";
import useReports from "../../hooks/useReports";
import NetworkView from "../../components/NetworkView";
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen() {
  const editReport = useEditedReportStore((state) => state.editReport);
  const { data, isLoading, refetch } = useReports();
  const reports = data?.data || [];
  const todaysReport = reports?.find(
    (report) =>
      report.date.substring(0, 10) === new Date().toISOString().substring(0, 10)
  );

  useFocusEffect(
    useCallback(() => {
      if (todaysReport !== undefined) {
        editReport(todaysReport);
      } else {
        editReport({
          id: 0,
          date: new Date().toISOString(),
          user_id: 0,
          symptoms: [],
        });
      }
    }, [todaysReport, editReport])
  );

  return (
    <Box marginTop={4}>
      <Heading fontSize="4xl" alignSelf="flex-start" marginLeft={5}>
        Accueil
      </Heading>
      <Text fontSize="2xl" alignSelf="flex-start" bold marginLeft={5}>
        Rapport quotidien
      </Text>
      <ScrollScreenView>
        <NetworkView
          isLoading={isLoading}
          skeleton={<Spinner accessibilityLabel="Chargement des rapports..." />}
          data={data}
          errorTitle="Erreur pendant le chargement des rapports"
          refetch={refetch}
          render={<SymptomsPanel />}
        />
      </ScrollScreenView>
    </Box>
  );
}

export default HomeScreen;
