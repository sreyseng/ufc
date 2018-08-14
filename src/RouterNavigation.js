import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import AddDeckScreen from './AddDeckScreen';

const RouterNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    AddDeck: AddDeckScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default RouterNavigation;
