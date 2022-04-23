import React from 'react';
import moment from 'moment';
import 'moment/locale/fr';

import StackNavigation from './navigation/Stack'

function App() {
  moment.locale("fr")

  return (
    <StackNavigation />
  );
}

export default App