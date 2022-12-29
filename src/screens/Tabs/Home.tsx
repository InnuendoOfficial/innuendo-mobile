import React from "react";
import { Button, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../../navigation/types";
import ScreenView from "../../components/ScreenView";
import useReports from "../../hooks/useReports";

function HomeScreen() {
  const { data } = useReports()
  console.log(data?.data)
  const navigation = useNavigation<StackNavProp>()
  const goToEditReportScreen = () => navigation.push("EditReport")

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