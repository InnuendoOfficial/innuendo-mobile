import React, { useEffect } from "react";
import { Text, Button, Spinner, Box, VStack, HStack, Circle, Image, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import useSymptoms from "../hooks/useSymptoms";
import { APISymptomType } from "../api/symptoms";
import useEditedReportStore from "../store/useEditedReport";
import NetworkView from "./NetworkView";
import MenstruationIcon from "../assets/icons/menstruationIcon.png"
import successIcon from "../assets/icons/successIcon.png"
import toFillIcon from "../assets/icons/toFillIcon.png"
import { TouchableHighlight } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function SymptomButton({ symptom }: { symptom: APISymptomType }) {
  const navigation = useNavigation<StackNavProp>();
  const report = useEditedReportStore((state) => state.report);
  const isFilled = report.symptoms.find(
    (existingSymptom) => existingSymptom.symptom_type_id === symptom.id
  )

  return (
    <TouchableHighlight
      onPress={() =>
        navigation.push("EditReportSymptom", {
          symptomName: symptom.name,
        })
      }
    >
      <Box
        width="100%"
        borderRadius={10}
        bgColor="white"
        shadow='4'
      >
        <HStack width="100%" justifyContent="space-between" paddingX={4} paddingY={2}>
          <HStack space={4}>
            <Circle bg="primary.400" padding={2}>
              <Image source={MenstruationIcon} alt="Icon" size={4} />
            </Circle>
            <Text fontFamily="heading" bold fontSize='lg'>
              {symptom.name}
            </Text>
          </HStack>
          <Icon
            as={MaterialCommunityIcons}
            name={isFilled ? "check-circle" : "dots-horizontal-circle"}
            size="xl"
            color={isFilled ? "green.600" : "orange.400" }
          />
        </HStack>
      </Box>
    </TouchableHighlight>
  );
}

function SymptomsPanelList({ symptoms }: { symptoms: APISymptomType[] }) {
  return (
    <VStack space={4}>
      {symptoms.map((symptom, index) => (
        <SymptomButton
          key={symptom.name + index.toString()}
          symptom={symptom}
        />
      ))}
    </VStack>
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
