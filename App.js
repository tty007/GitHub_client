import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Detail from './Detail';

const RootStack = createStackNavigator({
  
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'ホーム',
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions:  ({ navigation }) => {
      return {
        headerTitle: navigation.getParam('headerTitle', '詳細'),
      };
    }
  },
}, {
  initialRouteName: 'Home',
});

export default createAppContainer(RootStack);