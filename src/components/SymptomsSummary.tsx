import { Box, Heading, VStack } from "native-base";
import React from "react";
import { APISymptom } from "../api/reports";
import useEditedReportStore from "../store/useEditedReport";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function SymptomSummary({ symptom }: { symptom: APISymptom }) {
  return (
    <Box variant="card" paddingY={2} paddingX={4} borderRadius={10}>
      <Heading>
        {`${capitalize(symptom.symptom_type_name)} : ${symptom.value} ${
          symptom.symptom_type_unit_measure === "int" ? " / 10" : ""
        }`}
      </Heading>
    </Box>
  );
}

function SymptomsSummary() {
  const report = useEditedReportStore((state) => state.report);
  const symptoms = report.symptoms;

  return (
    <VStack width="100%" space={2}>
      {symptoms.map((symptom) => (
        <SymptomSummary key={symptom.symptom_type_name} symptom={symptom} />
      ))}
    </VStack>
  );
}

export default SymptomsSummary;
