import React from "react";
import { Text, Box, VStack, HStack, Circle, Image, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import { APISymptomType } from "../api/symptoms";
import useEditedReportStore from "../store/useEditedReport";
import { TouchableHighlight } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { capitalize } from "../utils";

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
              <Image source={{ uri: symptom.icon_url }} alt="Icon" size={4} />
            </Circle>
            <Text fontFamily="heading" fontSize='md'>
              {capitalize(symptom.name)}
            </Text>
          </HStack>
          {
            isFilled && (
              <Icon
                as={MaterialCommunityIcons}
                name={"check-circle"}
                size="xl"
                color={"green.600"}
              />
            )
          }
        </HStack>
      </Box>
    </TouchableHighlight>
  );
}

function SymptomsPanel({ symptoms }: { symptoms: APISymptomType[] }) {
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

export default SymptomsPanel;
