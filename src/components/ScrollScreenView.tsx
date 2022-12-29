import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Box, ScrollView } from "native-base";
import ScreenView from "./ScreenView";

type ScrollScreenViewProps = {
  children: React.ReactNode,
  style?: StyleProp<ViewStyle>,
}

function ScrollScreenView({ children, style } : ScrollScreenViewProps) {
  return (
    <ScrollView contentContainerStyle={style}>
      <ScreenView>
        {
          children
        }
      </ScreenView>
    </ScrollView>
  )
}

export default ScrollScreenView