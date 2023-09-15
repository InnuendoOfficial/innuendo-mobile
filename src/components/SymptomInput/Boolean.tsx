import React, { useState } from "react";
import { Box, Checkbox, Flex, Text } from "native-base";
import { SymptomInputTypeProps } from "./types";
import { Pressable } from "react-native";

function SymptomBooleanInput({
  title,
  value,
  onValueChange,
}: SymptomInputTypeProps) {
  const [mockValue, setMockValue] = useState(false);

  return (
    <Pressable onPress={() => setMockValue(!mockValue)}>
      <Box variant="card" paddingY={2} paddingX={4} borderRadius={10}>
        <Flex direction="row" alignItems="center">
          <Checkbox
            isChecked={mockValue}
            onChange={setMockValue}
            value={""}
            accessibilityLabel={title}
            width="20%"
          />
          <Text width="80%" textAlign="center" fontSize={18}>
            {title}
          </Text>
        </Flex>
      </Box>
    </Pressable>
  );
}

export default SymptomBooleanInput;
