import React from "react";
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  VStack,
  Heading,
  Image,
  Text,
  StatusBar,
  Box,
  Button,
  HStack,
  Circle,
} from "native-base";
import AppIntroSlider from "react-native-app-intro-slider";
import useAuthStore from "../store/auth";

type Slide = {
  title: string;
  text: string;
  image: ImageSourcePropType;
};

const slides: Slide[] = [
  {
    title: "Ayez une vue d'ensemble",
    text: "Consulter l'évolution de vos symptômes",
    image: require("../assets/illustrations/Menstrual.png"),
  },
  {
    title: "Participer à la recherche",
    text: "Vos rapports aident la recherche tout en étant anonymes et sécurisés",
    image: require("../assets/illustrations/Report.png"),
  },
  {
    title: "Une meilleure communication",
    text: "Partagez vos rapports avec votre médecin traitant",
    image: require("../assets/illustrations/Medic.png"),
  },
];

function SlideItem({ slide }: { slide: Slide }) {
  return (
    <VStack
      mb={20}
      flex={1}
      space={6}
      justifyContent="center"
      alignItems="center"
    >
      <HStack space={4}>
        <Image
          style={{ width: 48, height: 48, borderRadius: 40 }}
          source={require("../../assets/logos/round.png")}
          alt="Logo"
        />
        <Heading size="3xl" color="primary.400">
          Innuendo
        </Heading>
      </HStack>
      <Image
        source={slide.image}
        alt="Slide illustration"
        width="320"
        height="260"
        resizeMode="contain"
      />
      <Heading textAlign="center">{slide.title}</Heading>
      <Text maxWidth="80%" fontSize="lg" textAlign="center">
        {slide.text}
      </Text>
    </VStack>
  );
}

let slider: AppIntroSlider | undefined;

function Pagination({ activeIndex }: { activeIndex: number }) {
  const setAppIntroPassed = useAuthStore((state) => state.setAppIntroPassed);

  return (
    <VStack
      safeArea
      position="absolute"
      bottom="10"
      flex={1}
      space={8}
      alignItems="center"
    >
      <HStack space={5}>
        {slides.length > 1 &&
          slides.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => slider?.goToSlide(i, true)}
            >
              <Circle
                w="5"
                h="5"
                backgroundColor={i === activeIndex ? "primary.400" : "black"}
              />
            </TouchableOpacity>
          ))}
      </HStack>
      <Button
        w="80%"
        shadow={6}
        onPress={async () => await setAppIntroPassed()}
      >
        S'enregistrer
      </Button>
    </VStack>
  );
}

function AppIntroScreen() {
  return (
    <Box flex={1}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={(item) => item.title}
        renderItem={(item) => <SlideItem slide={item.item} />}
        renderPagination={(activeIndex) => (
          <Pagination activeIndex={activeIndex} />
        )}
        data={slides}
        ref={(ref: any) => (slider = ref!)}
      />
    </Box>
  );
}

export default AppIntroScreen;
