import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Box } from "native-base";

function ScreenView({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Box
      flex={1}
      paddingY={5}
      alignItems="center"
      _dark={{ backgroundColor: "#000000" }}
    >
      <Box flex={1} width="90%" alignItems="center" style={style} _dark={{ backgroundColor: "#000000" }} >
        {children}
      </Box>
    </Box>
  );
}

export default ScreenView;
