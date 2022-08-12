import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Box, ScrollView } from "native-base";
import ScreenView from "./ScreenView";

function ScrollScreenView({ children, style } : { children: React.ReactNode, style?: StyleProp<ViewStyle> }) {
  return (
    <ScrollView>
      <ScreenView>
        {
          children
        }
      </ScreenView>
    </ScrollView>
  )
}

export default ScrollScreenView