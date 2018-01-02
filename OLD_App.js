import React from 'react';
import { Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import Data from './Data';

const App = StackNavigator({
  Home: { 
  	screen: HomeScreen, 
		navigationOptions: {
      header: null
    }
  },
  Data: { screen: Data, },
});

export default App;