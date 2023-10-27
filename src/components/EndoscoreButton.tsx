import React, { useState } from "react";
import { useQueryClient } from "react-query";
import useEndoscoreMutation from "../hooks/useEndoscoreMutation";
import { Button, Text } from "native-base";

function EndoscoreButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const queryClient = useQueryClient();
  const createEndoscoreMutation = useEndoscoreMutation(queryClient);

  const generateNewEndoscore = async () => {
    setIsGenerating(true);
    await createEndoscoreMutation.mutateAsync();
    setIsGenerating(false);
  };

  return (
    <Button width="75%" isLoading={isGenerating} onPress={generateNewEndoscore}>
      <Text
        fontFamily="heading"
        bold
        fontSize={14}
        color="white"
        letterSpacing={2}
        textAlign="center"
      >
        ÉVALUER
      </Text>
    </Button>
  );
}

export default EndoscoreButton;
