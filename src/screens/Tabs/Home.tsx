import React, { useCallback, useEffect } from "react";
import { Heading, Spinner } from "native-base";
import ScrollScreenView from "../../components/ScrollScreenView";
import SymptomsPanel from "../../components/SymptomsPanel";
import useEditedReportStore from "../../store/useEditedReport";
import useReports from "../../hooks/useReports";
import NetworkView from "../../components/NetworkView";
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen() {
  const editReport = useEditedReportStore((state) => state.editReport)
  const { data, isLoading, refetch } = useReports()
  const reports = data?.data || []
  const todaysReport = reports?.find(report =>
    report.date.substring(0, 10) === new Date().toISOString().substring(0, 10)
  )

  useFocusEffect(
    useCallback(() => {
      if (todaysReport !== undefined) {
        editReport(todaysReport)
      } else {
        editReport({
          id: 0,
          date:  new Date().toISOString(),
          user_id: 0,
          symptoms: []
        })
      }
    }, [todaysReport, editReport])
  )

  return (
    <ScrollScreenView>
      <Heading fontSize="4xl" alignSelf="flex-start">
        Acceuil
      </Heading>
      <Heading bold>
        Rapport quotidien
      </Heading>
      <NetworkView
        isLoading={isLoading}
        skeleton={<Spinner accessibilityLabel="Chargement des rapports..." />}
        data={data}
        errorTitle="Erreur pendant le chargement des rapports"
        refetch={refetch}
        render={<SymptomsPanel />}
      />
    </ScrollScreenView>
  )
}

export default HomeScreen