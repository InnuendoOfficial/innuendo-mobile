// App.tsx
/**
 * This is our main React Component.
 */

import React, { useEffect } from "react";
import LogRocket from '@logrocket/react-native';
import theme from "./Theme";
import moment from "moment";
import "moment/locale/fr";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider } from "native-base";
import StackNavigation from "./navigation/Stack";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    LogRocket.init('yuhmle/innuendo')
  }, []);
  moment.locale("fr");

  return (
    <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
      <QueryClientProvider client={queryClient}>
        <StackNavigation />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

export default App;
