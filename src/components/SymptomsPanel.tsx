import * as React from "react";
import { Text, Button, Spinner, Box } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import useSymptoms from "../hooks/useSymptoms";
import { APISymptomType } from "../api/symptoms";
import useEditedReportStore from "../store/useEditedReport";
import NetworkView from "./NetworkView";

function SymptomButton({ symptom }: { symptom: APISymptomType }) {
  const navigation = useNavigation<StackNavProp>();
  const report = useEditedReportStore((state) => state.report);

  //here

  // return (
  //   <Button
  //     flex={1}
  //     width="100%"
  //     height={10}
  //     borderRadius={10}
  //     marginBottom={4}
  //     justifyContent="center"
  //     alignItems="center"
  //     bg={
  //       report.symptoms.find(
  //         (existingSymptom) =>
  //           existingSymptom.symptom_type_name === symptom.name
  //       )
  //         ? "white.200"
  //         : "white.400"
  //     }
  //     onPress={() =>
  //       navigation.push("EditReportSymptom", {
  //         symptomName: symptom.name,
  //       })
  //     }
  //     startIcon={
  //       <Icon
  //         as={<IoniconsIcon name="ellipse" />}
  //         color="purple.500"
  //         size="xs"
  //       />
  //     }
  //     endIcon={<Icon as={<IoniconsIcon name="external-link" />} />}
  //   >
  //     <Text bold fontSize={15} color="black" textAlign="center">
  //       {symptom.name}
  //     </Text>
  //   </Button>
  // )

  return (
    <Button
      flex={1}
      width="100%"
      height={10}
      borderRadius={10}
      marginBottom={4}
      justifyContent="center"
      alignItems="center"
      bg={
        report.symptoms.find(
          (existingSymptom) =>
            existingSymptom.symptom_type_name === symptom.name
        )
          ? "primary.200"
          : "primary.400"
      }
      onPress={() =>
        navigation.push("EditReportSymptom", {
          symptomName: symptom.name,
        })
      }
    >
      <Text bold fontSize={15} color="white" textAlign="center">
        {symptom.name}
      </Text>
    </Button>
  );
}

function SymptomsPanelList({ symptoms }: { symptoms: APISymptomType[] }) {
  return (
    <Box width="100%" justifyContent="center" flexDirection="column">
      {symptoms.map((symptom, index) => (
        <SymptomButton
          key={symptom.name + index.toString()}
          symptom={symptom}
        />
      ))}
    </Box>
  );
}

function SymptomsPanel() {
  const { isLoading, data, refetch } = useSymptoms();
  const symptoms = data?.data || [];

  return (
    <NetworkView
      isLoading={isLoading}
      skeleton={<Spinner accessibilityLabel="Chargement des symptômes..." />}
      data={data}
      errorTitle={"Erreur pendant le chargement des symptômes"}
      refetch={refetch}
      render={<SymptomsPanelList symptoms={symptoms} />}
    />
  );
}

export default SymptomsPanel;
