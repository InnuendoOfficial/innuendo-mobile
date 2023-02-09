import { Button } from 'native-base'
import React from 'react'
import ScreenView from '../components/ScreenView'
import useAuthStore from '../store/auth'

function SettingsScreen() {
  const signOut = useAuthStore((state) => state.signOut)

  return (
    <ScreenView>
      <Button rounded='lg' size="lg" w="90%" bgColor="danger.600" onPress={signOut}>
        Se deconnecter
      </Button>
    </ScreenView>
  )
}

export default SettingsScreen