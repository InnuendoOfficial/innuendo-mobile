import React, { useState } from "react";
import { Box, Center, Slider, Text, VStack } from "native-base";
import { SymptomInputProps } from "./types";

function SymptomNumberInput({ title, description, value, onValueChange } : SymptomInputProps) {
  const [mockValue, setMockValue] = useState(0)

  return (
    <Box variant="card" paddingY={2} borderRadius={10}>
      <VStack alignItems="center" space={2} >
        <Text fontSize={18} bold>
          { title }
        </Text>
        <Slider
          width={300}
          height={50}
          minValue={0}
          maxValue={10}
          marginY={-4}
          value={mockValue}
          onChange={newValue => setMockValue(newValue)}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <Text fontSize={24} bold>
          { mockValue }
        </Text>
      </VStack>
    </Box>
  )
}

export default SymptomNumberInput