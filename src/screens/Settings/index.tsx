import { Heading, Text, useColorMode, Box, VStack, HStack, Icon } from "native-base";
import React from "react";
import useAuthStore from "../../store/auth";
import ScrollScreenView from "../../components/ScrollScreenView";
import { SettingsScreenProps } from "../types";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TouchableOpacity, Switch } from "react-native";

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const signOut = useAuthStore((state) => state.signOut);
  const goToFeedback = () => navigation.push("Feedback");
  const goToDeleteAccount = () => navigation.push("DeleteAccount");
  const goToChangePassword = () => navigation.push("ChangePassword");
  const goToDeleteData = () => navigation.push("DeleteData");
  const { colorMode, toggleColorMode } = useColorMode()

  const SECTIONS = [
    {
      header: 'Compte',
      icon: 'settings',
      items: [
        {
          icon: 'lock',
          color: '#007afe',
          label: 'Modifier mot de passe',
          type: 'link',
        },
      ],
    },
    {
      header: 'Preferences',
      icon: 'align-center',
      items: [
        { icon: 'globe', color: '#fe9400', label: 'Langue', type: 'link' },
        { icon: 'moon', color: '#51414F', label: 'Thème', value: true, type: 'boolean' },
      ],
    },
    {
      header: 'Aide',
      icon: 'help-circle',
      items: [
        { icon: 'mail', color: '#32c759', label: 'Nous contacter', type: 'link' },
      ],
    },
    {
      header: 'Action de compte',
      icon: 'help-circle',
      items: [
        { icon: 'delete', color: '#fd2d54', label: 'Supprimer mon compte', type: 'link' },
        { icon: 'log-out', color: '#fd2d54', label: 'Se deconnecter', type: 'link' },
      ],
    }
  ];

  return (
    <ScrollScreenView>
      <Heading bold fontSize={40} _dark={{ bgColor: "#252526" }}>
        Paramètres
      </Heading>
      {SECTIONS.map(({ header, items }) => (
        <VStack key={header} space={2} my={2}>
          <Text fontSize="sm" fontWeight="bold" color="gray.500" textTransform="uppercase">{header}</Text>
          {items.map(({ label, icon, type, value, color }, index) => {
            return (
                <TouchableOpacity
                  key={label}
                  onPress={() => {
                    if (label == "Se deconnecter") {
                      signOut()
                    } else if (label == "Rapporter un bug") {
                      goToFeedback()
                    } else if (label == "Nous contacter") {
                      goToFeedback()
                    } else if (label == "Supprimer mon compte") {
                      goToDeleteAccount()
                    } else if (label == "Modifier mot de passe") {
                      goToChangePassword()
                    } else if (label == "Supprimer les données") {
                      goToDeleteData()
                    }
                  }}>
                <HStack alignItems="center" _dark={{ bg: "#252526" }} borderRadius={8} p={2} space={2}>
                  <Box bg={color} borderRadius={9999} size={8} mr={2} alignItems="center" justifyContent="center">
                    <Icon as={FeatherIcon} color="white" name={icon} size={4} />
                  </Box>
                  <Text flex={1} fontSize={17} mr={4}>{label}</Text>
                  {type === 'boolean' && <Switch value={colorMode === "light"} onValueChange={() => toggleColorMode()} />}
                  {type === 'link' && (
                    <Icon as={FeatherIcon} name="chevron-right" size={5} />
                  )}
                </HStack>
              </TouchableOpacity>
            );
          })}
        </VStack>
      ))}
    </ScrollScreenView>
  );
}

export default SettingsScreen;