// import './gesture-handler';
// import 'react-native-gesture-handler';
// import 'react-native-reanimated';

import React, {useContext} from 'react';
import StackNavigator from './src/navigator';
import {ThemeContext, ThemeProvider} from './src/context/ThemeContext';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <ThemeProvider>
      <StackNavigator />
    </ThemeProvider>
  );
};

export default App;
