import React from "react";
import { Box, Slider, Text, VStack } from "native-base";
import { SymptomInputTypeProps } from "./types";

function SymptomNumberInput({
  title,
  value,
  onValueChange,
}: SymptomInputTypeProps) {
  return (
    <Box variant="card" paddingY={2} paddingX={4} borderRadius={10}>
      <VStack alignItems="center" space={2}>
        <Text fontSize={18} bold>
          Évaluez votre symptôme
        </Text>
        <Slider
          width={300}
          height={50}
          minValue={0}
          maxValue={10}
          marginY={-4}
          value={typeof value === "number" ? value : 0}
          onChange={(newValue) => onValueChange(newValue)}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <Text fontSize={24} bold>
          {value || 0}
        </Text>
      </VStack>
    </Box>
  );
}

export default SymptomNumberInput;
