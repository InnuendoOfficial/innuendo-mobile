import React from "react";
import { Center, Image } from "native-base";
import InnuendoLogo from "../assets/logos/round.png";

function SplashScreen() {
  return (
    <Center flex={1}>
      <Image
        source={InnuendoLogo}
        alt="Innuendo"
        width="250"
        height="250"
        resizeMode="contain"
      />
    </Center>
  );
}

export default SplashScreen;
