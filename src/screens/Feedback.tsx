import { Button, Heading, Text, TextArea, VStack } from "native-base";
import React, { useState } from "react";
import api from "../api";
import ScreenView from "../components/ScreenView";
import { FeedbackScreenProps } from "./types";

function FeedbackScreen({ navigation }: FeedbackScreenProps) {
  const [feedbackText, setFeedbackText] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const sendFeedback = async () => {
    setIsSendingFeedback(true);
    const { error } = await api.sendFeedback(feedbackText);
    setIsSendingFeedback(false);
    if (!error) {
      navigation.goBack();
    }
  };

  return (
    <ScreenView>
      <VStack space={4} alignItems="center">
        <Heading>Feedback</Heading>
        <Text textAlign="center">Votre avis est important pour nous.</Text>
        <Text textAlign="center">
          Si vous avez des suggestions ou des retours à nous faire parvenir,
          laissez nous un message si dessous.
        </Text>
        <TextArea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.currentTarget.value)} // for web
          onChangeText={(text) => setFeedbackText(text)} // for android and ios
          maxW="300"
          isDisabled={isSendingFeedback}
        />
        <Button size="lg" isLoading={isSendingFeedback} onPress={sendFeedback}>
          Envoyer un retour
        </Button>
      </VStack>
    </ScreenView>
  );
}

export default FeedbackScreen;
