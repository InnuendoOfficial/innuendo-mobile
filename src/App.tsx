// App.tsx
/**
 * This is our main React Component.
 */

import React from 'react';
import theme from './theme';
import moment from 'moment';
import 'moment/locale/fr';
import { NativeBaseProvider } from 'native-base';
import StackNavigation from './navigation/Stack';

function App() {
  moment.locale("fr")

  return (
    <NativeBaseProvider theme={theme}>
      <StackNavigation />
    </NativeBaseProvider>
  );
}

export default App