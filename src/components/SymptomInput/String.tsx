import React from "react";
import { Box, Heading, Input, VStack } from "native-base";
import { SymptomInputTypeProps } from "./types";

function SymptomStringInput({
  title,
  value,
  onValueChange,
}: SymptomInputTypeProps) {
  return (
    <Box variant="card" paddingY={2} paddingX={4} borderRadius={10}>
      <VStack space={2}>
        <Heading>{title}</Heading>
        <Input
          value={typeof value === "string" ? value : undefined}
          onChangeText={(text) => onValueChange(text)}
          mx="3"
          w="100%"
        />
      </VStack>
    </Box>
  );
}

export default SymptomStringInput;
