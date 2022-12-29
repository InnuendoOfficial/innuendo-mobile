// Currently only used for medications

import React, { useState } from "react";
import { Box, Heading, HStack, Icon, Input, Text, VStack } from "native-base";
import { SymptomInputTypeProps } from "./types";
import EntypoIcons from 'react-native-vector-icons/Entypo';

function SymptomArrayInput({ title, value, onValueChange } : SymptomInputTypeProps) {
  const [mockText, setMockText] = useState("")
  const [mockValue, setMockValue] = useState([
    "Spasfon 200mg",
    "Efferalgan",
    "Imodium"
  ])

  return (
    <Box variant="card" padding={2} borderRadius={10}>
      <VStack space={2}>
        <Heading fontSize={18} bold>
          { title }
        </Heading>
        <VStack minHeight={150} borderWidth={1} borderRadius={10} borderColor="primary.400" backgroundColor="#F2F2F2">
          <Input
            variant="unstyled"
            placeholder="Medicament ex: Spasfon 500mg"
            value={mockText}
            onChangeText={newText => setMockText(newText)}
            onSubmitEditing={() => { setMockValue([mockText, ...mockValue]); setMockText(""); }}
          />
          {
            mockValue.map(value =>
              <HStack key={value} padding={2} borderTopWidth={2} borderColor="primary.400" >
                <Text width="90%">
                  { value }
                </Text>
                <Icon
                  as={EntypoIcons}
                  name="cross"
                  color="red.500"
                  size="lg"
                  onPress={() => setMockValue(mockValue.filter(otherValue =>
                    value !== otherValue
                  ))}
                />
              </HStack>
            )
          }
        </VStack>
      </VStack>
    </Box>
  )
}

export default SymptomArrayInput