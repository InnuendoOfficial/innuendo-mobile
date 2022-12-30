import * as React from "react";
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Heading, Pressable, Box, HStack, Badge, Spacer, Flex, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../../navigation/types";
import ScreenView from "../../components/ScreenView";
import  SymptomCategoriesPanel from "../../components/SymptomCategoriesPanel"

function HomeScreen() {
  const navigation = useNavigation<StackNavProp>()
  const goToEditReportScreen = () => navigation.push("EditReport", { reportDate: "2022-01-01"})

  return (
    <ScreenView>
      <Heading>
        Home screen
      </Heading>
      {/* <EndoScorePanel/> */}
      <Heading bold>
        Rapport quotidien
      </Heading>
      <SymptomCategoriesPanel reportDate="2022-01-01" />
    </ScreenView>
  )
}

function Separator() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 25, marginTop: 10 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
    </View>
  )
}

function WelcomeView() {
  return (
    <View style={{ ...styles.card, width: "85%" }}>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black', textAlign: 'center'}}>
        Bienvenue, anonyme !
      </Text>
    </View>
  )
}

function LastEndoScore() {
  return (
    <View style={styles.card}>
      <Text style={{fontSize: 12, color: 'black', textAlign: 'center', bottom: '30%'}}>
        Dernier EndoScore
      </Text>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black', textAlign: 'center'}}>
        4.21
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center'
  },
  cardContainer: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 10
  },
  card: {
    marginRight: 5,
    backgroundColor: "white",
    width: "45%",
    borderRadius: 12,
    paddingVertical: 40,
    shadowColor: "black",
    elevation: 3
  },
})

export default HomeScreen