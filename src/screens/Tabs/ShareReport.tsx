import React from "react";
import { Button, Center, Heading, VStack } from "native-base";
import ScreenView from "../../components/ScreenView";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackParamList, TabParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import InnuendoLogo from "../../assets/logos/round.png";
import QRCode from "react-native-qrcode-svg";

type ShareReportScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "ShareReport">,
  NativeStackScreenProps<StackParamList>
>;

function ShareReportScreen({ navigation, route }: ShareReportScreenProps) {
  const goToChooseSymptomScreen = () =>
    navigation.push("ShareReportChooseSymptoms");

  return (
    <ScreenView>
      <Heading fontSize="4xl" alignSelf="flex-start">
        Code
      </Heading>
      <Center flex={1}>
        {route.params?.accessCode !== undefined && (
          <VStack
            space={4}
            alignItems="center"
            padding={4}
            bgColor="red"
            w="100%"
          >
            <QRCode
              value="https://eip.epitech.eu/"
              color="#776CCB"
              size={200}
              logo={InnuendoLogo}
              logoSize={100}
              logoBackgroundColor="transparent"
            />
            <Heading bold fontSize="3xl">
              {route.params.accessCode}
            </Heading>
          </VStack>
        )}
        <Button onPress={goToChooseSymptomScreen}>Générer un code</Button>
      </Center>
    </ScreenView>
  );
}

export default ShareReportScreen;
