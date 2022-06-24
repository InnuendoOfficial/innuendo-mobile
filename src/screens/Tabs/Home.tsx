import React from "react";
import { Button, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../../navigation/types";
import ScreenView from "../../components/ScreenView";

function HomeScreen() {
  const navigation = useNavigation<StackNavProp>()

  return (
    <ScreenView>
      <Heading>
        Home screen
      </Heading>
      <Button onPress={() => navigation.push("EditReport")}>
        Go to edit report screen
      </Button>
    </ScreenView>
  )
}

export default HomeScreen