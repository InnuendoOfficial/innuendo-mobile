import React, { useCallback } from "react";
import {
  Heading,
  Spinner,
  Box,
  Text,
  HStack,
  Circle,
  Image,
  VStack,
  Icon,
  Button,
  IconButton,
  View,
  Center,
} from "native-base";
import ScrollScreenView from "../../components/ScrollScreenView";
import SymptomsPanel from "../../components/SymptomsPanel";
import useEditedReportStore from "../../store/useEditedReport";
import useReports from "../../hooks/useReports";
import Ionicons from "react-native-vector-icons/Ionicons";
import NetworkView from "../../components/NetworkView";
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  useFocusEffect,
} from "@react-navigation/native";
import StarIcon from "../../assets/icons/starIcon.png";
import useEndoscore from "../../hooks/useEndoscore";
import moment from "moment";
import { TouchableHighlight, TouchableOpacity } from "react-native";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../../navigation/types";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import useSymptoms from "../../hooks/useSymptoms";
import LottieView from "lottie-react-native";

type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Home">,
  NativeStackScreenProps<StackParamList>
>;

function EndoscorePreview({
  navigation,
}: {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, "Home">,
    NativeStackNavigationProp<StackParamList>
  >;
}) {
  const { data, isLoading } = useEndoscore();
  const endoscore = data?.data;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <TouchableHighlight onPress={() => navigation.navigate("Endoscore")}>
      <Box
        bgColor={"white"}
        width="100%"
        borderRadius={10}
        shadow="4"
        alignItems="center"
        paddingY={4}
      >
        <VStack space={4} alignItems={"center"}>
          <HStack
            space={2}
            width="100%"
            justifyContent="space-between"
            paddingX={4}
            paddingY={2}
          >
            <HStack space={4}>
              <Circle bg="primary.400" padding={2}>
                <Image source={StarIcon} alt="Icon" size={4} />
              </Circle>
              {!endoscore ? (
                <Heading bold fontSize="md">
                  Endoscore
                </Heading>
              ) : (
                <VStack maxWidth={100} bgColor="red">
                  <Heading bold fontSize="md">
                    Endoscore
                  </Heading>
                  <Text fontSize="sm" color="#67647D">
                    {moment(endoscore.created_at).format("Do MMMM")}
                  </Text>
                </VStack>
              )}
            </HStack>
            <Text fontSize="md" color="primary.400">
              Score: {endoscore?.score ? endoscore.score.toFixed(0) : "aucun"}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableHighlight>
  );
}

function HomeScreen({ navigation }: HomeProps) {
  const editReport = useEditedReportStore((state) => state.editReport);
  const { data: reportsData, isLoading, refetch } = useReports();
  const { data: symptomsData } = useSymptoms();
  const symptomsType = symptomsData?.data || [];
  const reports = reportsData?.data || [];
  const todaysReport = reports?.find(
    (report) =>
      report.date.substring(0, 10) === new Date().toISOString().substring(0, 10)
  );
  const filledSymptoms = symptomsType.filter((symptomType) =>
    todaysReport === undefined || todaysReport.symptoms === undefined
      ? false
      : todaysReport.symptoms.find(
          (symptom) => symptom.symptom_type_id === symptomType.id
        )
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
      <Heading
        fontSize="4xl"
        alignSelf="flex-start"
        marginBottom={4}
        color="#3C3B40"
      >
        Accueil
      </Heading>
      <VStack space={4}>
        <EndoscorePreview navigation={navigation} />
        <HStack justifyContent="space-between">
          <Text fontSize="2xl" alignSelf="flex-start" bold>
            Rapport quotidien
          </Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Endoscore")}>
            <Icon
              as={Ionicons}
              name="add-circle-outline"
              size="xl"
              color={"primary.400"}
            />
          </TouchableOpacity> */}
          {/* <Button
            onPress={() => navigation.push("EditReport")}
            _text={{ fontWeight: "bold", fontSize: "md" }}
            leftIcon={
              <Icon as={Ionicons} name="add-circle-outline" size="lg" />
            }
          >

          </Button> */}
        </HStack>
        <Button
          width="100%"
          size="lg"
          onPress={() => navigation.push("EditReport")}
          _text={{ fontWeight: "bold", fontSize: "md" }}
          leftIcon={<Icon as={Ionicons} name="add-circle-outline" size="lg" />}
        >
          Renseigner un symptôme
        </Button>
        {todaysReport && <SymptomsPanel symptoms={filledSymptoms} />}
        <Text>
          Plus que {symptomsType.length - filledSymptoms.length} symptômes à
          remplir aujourd'hui!
        </Text>
        <Center width="100%">
          <LottieView
            style={{ height: 300, width: 300 }}
            source={require("../../assets/illustrations/MobileWoman.lottie")}
            autoPlay
            loop
            resizeMode="contain"
          />
        </Center>

        {/* <Image
          source={MobileWoman}
          width="100%"
          height={250}
          resizeMode="contain"
          // style={{ width: 250, height: 250 }}
          alt="Femme remplissant son rapport journalier"
        /> */}
      </VStack>
    </ScrollScreenView>
  );
}

export default HomeScreen;
