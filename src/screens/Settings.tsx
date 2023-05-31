import { Button, VStack } from 'native-base'
import React from 'react'
import ScreenView from '../components/ScreenView'
import useAuthStore from '../store/auth'
import { SettingsScreenProps } from './types'

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const signOut = useAuthStore((state) => state.signOut)
  const goToFeedback = () => navigation.push("Feedback")

  return (
    <ScreenView>
      <VStack space={4} alignItems="center">
        <Button rounded='lg' size="lg" w="90%" onPress={goToFeedback}>
          Donner son avis / Rapporter un bug
        </Button>
        <Button rounded='lg' size="lg" w="90%" bgColor="danger.600" onPress={signOut}>
          Se deconnecter
        </Button>
      </VStack>
    </ScreenView>
  )
}

export default SettingsScreen