// App.tsx
/**
 * This is our main React Component.
 */

import React from 'react';
import theme from './theme';
import { NativeBaseProvider } from 'native-base';
import StackNavigation from './navigation/Stack';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <StackNavigation />
    </NativeBaseProvider>
  );
}

export default App