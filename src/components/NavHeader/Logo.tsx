import React from "react";
import { Image } from "react-native";

function Logo() {
  return (
    <Image
      style={{ width: 32, height: 32 }}
      source={require("../../assets/logos/only_symbol_white.png")}
      resizeMode="stretch"
    />
  );
}

export default Logo;
