import React, { useCallback } from "react";
import { Heading, Spinner, Box, Text, HStack, Circle, Image, VStack, Icon } from "native-base";
import ScrollScreenView from "../../components/ScrollScreenView";
import SymptomsPanel from "../../components/SymptomsPanel";
import useEditedReportStore from "../../store/useEditedReport";
import useReports from "../../hooks/useReports";
import NetworkView from "../../components/NetworkView";
import { useFocusEffect } from "@react-navigation/native";
import StarIcon from "../../assets/icons/starIcon.png"
import useEndoscore from "../../hooks/useEndoscore";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigation/types";

type HomeProps = BottomTabScreenProps<TabParamList, "Home">

function EndoscorePreview({ navigation } : { navigation: BottomTabNavigationProp<TabParamList, "Home">}) {
  const { data, isLoading } = useEndoscore();
  const endoscore = data?.data;

  if (isLoading) {
    return (<Spinner />)
  }

  return (
    <Box bgColor={"white"}
      width="100%"
      borderRadius={10}
      shadow="4"
      alignItems="center"
    >
      <HStack space={2} width="100%" justifyContent="space-between" padding={2} borderRadius={10}>
        <HStack space={2}>
          <Circle bg="primary.400" padding={2}>
            <Image source={StarIcon} alt="Icon" size={4} />
          </Circle>
          {
            !endoscore ? (
              <Heading bold fontSize="md">
                Endoscore
              </Heading>
            ) : (
              <VStack maxWidth={100}>
                <Heading bold fontSize="md">
                  Endoscore
                </Heading>
                <Text fontSize="sm" color="#67647D">
                  {moment(endoscore.created_at).format("Do MMMM")}
                </Text>
              </VStack>
            )
          }
        </HStack>
        <Text fontSize="md" color="primary.400">
          Score: {endoscore?.score ? endoscore.score.toFixed(0) : "aucun"}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Endoscore")}>
          <Icon
            as={MaterialIcons}
            name="help"
            size="xl"
            color={"black"}
          />
        </TouchableOpacity>
      </HStack>
    </Box>
  )
}

function HomeScreen({ navigation } : HomeProps) {
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
    <ScrollScreenView>
      <Heading fontSize="4xl" alignSelf="flex-start" marginBottom={4}>
        Accueil
      </Heading>
      <EndoscorePreview navigation={navigation} />
      <Text fontSize="2xl" alignSelf="flex-start" bold marginTop={8}>
        Rapports quotidiens
      </Text>
      <NetworkView
        isLoading={isLoading}
        skeleton={<Spinner accessibilityLabel="Chargement des rapports..." />}
        data={data}
        errorTitle="Erreur pendant le chargement des rapports"
        refetch={refetch}
        render={<SymptomsPanel />}
      />
    </ScrollScreenView>
  );
}

export default HomeScreen;
