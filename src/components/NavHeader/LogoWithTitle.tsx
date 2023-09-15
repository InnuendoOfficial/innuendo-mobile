import React from "react";
import { Image, Text, View } from "react-native";

function LogoWithTitle() {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Image
        style={{ width: 32, height: 32, borderRadius: 40 }}
        source={require("../../assets/logos/round.png")}
      />
      <Text style={{ color: "#67647D", marginLeft: 10 }}>Innuendo</Text>
    </View>
  );
}

export default LogoWithTitle;
