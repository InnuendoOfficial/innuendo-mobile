import { Button, Heading, Text, VStack, Modal } from "native-base";
import React from "react";
import ScreenView from "../components/ScreenView";
import useAuthStore from "../store/auth";
import ScrollScreenView from "../components/ScrollScreenView";
import { SettingsScreenProps } from "./types";
import { Image, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import FeatherIcon from 'react-native-vector-icons/Feather';

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const signOut = useAuthStore((state) => state.signOut);
  const goToFeedback = () => navigation.push("Feedback");
  const goToDeleteAccount = () => navigation.push("DeleteAccount");
  const goToChangePassword = () => navigation.push("ChangePassword");
  const goToChangeEmail = () => navigation.push("ChangeEmail");
  const goToDeleteData = () => navigation.push("DeleteData");


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
        {
          icon: 'at-sign',
          color: '#007afe',
          label: 'Modifier adresse e-mail',
          type: 'link',
        },
        // { icon: 'navigation', color: '#32c759', label: 'Location', type: 'link' },
        // {
        //   icon: 'users',
        //   color: '#32c759',
        //   label: 'Show collaborators',
        //   value: true,
        //   type: 'boolean',
        // },
        // {
        //   icon: 'airplay',
        //   color: '#fd2d54',
        //   label: 'Accessibility mode',
        //   value: false,
        //   type: 'boolean',
        // },
      ],
    },
    {
      header: 'Preferences',
      icon: 'align-center',
      items: [
        { icon: 'globe', color: '#fe9400', label: 'Langue', type: 'link' },
        { icon: 'bell', color: '#fd2d54', label: 'Notifications', value: true, type: 'boolean' },
      ],
    },
    {
      header: 'Aide',
      icon: 'help-circle',
      items: [
        { icon: 'flag', color: '#8e8d91', label: 'Rapporter un bug', type: 'link' },
        { icon: 'mail', color: '#32c759', label: 'Nous contacter', type: 'link' },
      ],
    },
    {
      header: 'Action de compte',
      icon: 'help-circle',
      items: [
        { icon: 'database', color: '#fe9400', label: 'Supprimer les données', type: 'link' },
        { icon: 'delete', color: '#fd2d54', label: 'Supprimer le compte', type: 'link' },
        { icon: 'log-out', color: '#fd2d54', label: 'Se deconnecter', type: 'link' },
      ],
    }
  ];

  return (
      <ScrollScreenView >
        <Heading bold fontSize={40} alignSelf="flex-start" color="#3C3B40">
          Paramètres
        </Heading>
        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <Text style={styles.sectionHeader}>{header}</Text>
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
                    } else if (label == "Supprimer le compte") {
                      goToDeleteAccount()
                    } else if (label == "Modifier mot de passe") {
                      goToChangePassword()
                    } else if (label == "Modifier adresse e-mail") {
                      goToChangeEmail()
                    } else if (label == "Supprimer les données") {
                      goToDeleteData()
                    }
                  }}>
                  <View style={styles.row}>
                    <View style={[styles.rowIcon, { backgroundColor: color }]}>
                      <FeatherIcon color="#fff" name={icon} size={18} />
                    </View>

                    <Text style={styles.rowLabel}>{label}</Text>

                    <View style={styles.rowSpacer} />

                    {type === 'boolean' && <Switch value={value} />}

                    {type === 'link' && (
                      <FeatherIcon
                        color="#0c0c0c"
                        name="chevron-right"
                        size={22}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollScreenView>
  );
}

const styles = StyleSheet.create({
  section: {
    alignSelf: 'flex-start'
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 6,
    // paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    marginRight: 100,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

export default SettingsScreen;
