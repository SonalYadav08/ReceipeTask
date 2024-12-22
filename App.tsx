// import './gesture-handler';
// import 'react-native-gesture-handler';
// import 'react-native-reanimated';

import React, {useContext} from 'react';
import StackNavigator from './src/navigator';
import {ThemeProvider} from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <StackNavigator />
    </ThemeProvider>
  );
};

export default App;
