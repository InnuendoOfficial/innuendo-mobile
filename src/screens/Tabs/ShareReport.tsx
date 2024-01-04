import React from "react";
import { Button, Center, Heading, Text, VStack } from "native-base";
import ScreenView from "../../components/ScreenView";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackParamList, TabParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type ShareReportScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "ShareReport">,
  NativeStackScreenProps<StackParamList>
>;

function ShareReportScreen({ navigation, route }: ShareReportScreenProps) {
  const goToChooseSymptomScreen = () =>
    navigation.push("ShareReportChooseSymptoms");

  return (
    <ScreenView>
      <Heading bold fontSize={40} alignSelf="flex-start" color="#3C3B40" _dark={{ color: "white" }}>
        Code
      </Heading>
      <VStack flex={1} space={8} justifyContent="center" alignItems="center">
        {route.params?.accessCode !== undefined && (
          <Heading bold fontSize="3xl">
            {route.params.accessCode}
          </Heading>
        )}
        <Button width="75%" onPress={goToChooseSymptomScreen} >
          <Text fontFamily="heading" bold fontSize={14} color="white" letterSpacing={2} textAlign="center">
            GENERER UN {route.params?.accessCode ? "NOUVEAU " : ""}CODE
          </Text>
        </Button>
      </VStack>
    </ScreenView>
  );
}

export default ShareReportScreen;
