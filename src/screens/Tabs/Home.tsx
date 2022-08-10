import React from "react";
import { Button, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../../navigation/types";
import ScreenView from "../../components/ScreenView";

function HomeScreen() {
  const navigation = useNavigation<StackNavProp>()
  const goToEditReportScreen = () => navigation.push("EditReport", { reportDate: "2022-01-01"})

  return (
    <ScreenView>
      <Heading>
        Home screen
      </Heading>
      <Button onPress={goToEditReportScreen}>
        Go to edit report screen
      </Button>
    </ScreenView>
  )
}

export default HomeScreen