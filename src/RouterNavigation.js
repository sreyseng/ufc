import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import AddDeckScreen from './AddDeckScreen';
import DeckDetailsScreen from './DeckDetailsScreen';

const RouterNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    AddDeck: AddDeckScreen,
    DeckDetails: DeckDetailsScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default RouterNavigation;
