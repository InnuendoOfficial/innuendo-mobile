// App.tsx
/**
 * This is our main React Component.
 */

import React from 'react';
import theme from './Theme';
import moment from 'moment';
import 'moment/locale/fr';
import { NativeBaseProvider } from 'native-base';
import StackNavigation from './navigation/Stack';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function App() {
  moment.locale("fr")

  return (
    <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
      <StackNavigation />
    </NativeBaseProvider>
  );
}

export default App