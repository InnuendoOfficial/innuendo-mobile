import React from "react";
import { Button, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import ScreenView from "../components/ScreenView";

function EditReportScreen() {
  const navigation = useNavigation<StackNavProp>()

  return (
    <ScreenView>
      <Heading>
        Edit report screen
      </Heading>
      <Button onPress={() => navigation.push("EditReportCategory")}>
        Go to edit report category screen
      </Button>
    </ScreenView>
  )
}

export default EditReportScreen