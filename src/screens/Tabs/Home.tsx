import React from "react";
import { Heading } from "native-base";
import ScrollScreenView from "../../components/ScrollScreenView";
import SymptomsPanel from "../../components/SymptomsPanel";

function HomeScreen() {
  return (
    <ScrollScreenView>
      <Heading fontSize="4xl" alignSelf="flex-start">
        Acceuil
      </Heading>
      <Heading bold>
        Rapport quotidien
      </Heading>
      <SymptomsPanel />
    </ScrollScreenView>
  )
}

export default HomeScreen