import React from "react";
import { Text, Box, Button, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { DateData } from "react-native-calendars/src/types";
import moment from "moment";
import { StackNavProp } from "../../navigation/types";
import { APIReport } from "../../api/reports";
import useEditedReportStore from "../../store/useEditedReport";

type DayReportProps = {
  date: DateData;
  report: APIReport | undefined;
};

function DayReport({ date, report }: DayReportProps) {
  const navigation = useNavigation<StackNavProp>();
  const today = new Date();
  const dayInFuture: boolean = date.timestamp > today.getTime();
  const editReport = useEditedReportStore((state) => state.editReport);
  const onPress = () => {
    editReport(
      report
        ? report
        : {
            id: 0,
            date: new Date(date.dateString + "T12:00:00.0Z").toISOString(),
            // create report at day noon, otherwise moment considers it was the previous day
            user_id: 0,
            symptoms: [],
          }
    );
    navigation.push(report ? "ViewReport" : "EditReport");
  };

  return (
    <Box
      bgColor={"white"}
      width="100%"
      borderRadius={12}
      padding="5"
      shadow="5"
      alignItems="center"
    >
      <VStack w="100%" alignItems="center" space={2}>
        <Text fontSize={18}>
          {moment(date.dateString).format("dddd DD MMMM Y")}
        </Text>
        {!dayInFuture && (
          <Button width="100%" borderRadius={12} onPress={onPress}>
            <Text fontFamily={"roboto"} color={"white"}>
              {report ? "Consulter le rapport" : "Créer un nouveau rapport"}
            </Text>
          </Button>
        )}
      </VStack>
    </Box>
  );
}

export default DayReport;
