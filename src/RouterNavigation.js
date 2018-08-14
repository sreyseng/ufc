import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import AddDeckScreen from './AddDeckScreen';
import DeckDetailsScreen from './DeckDetailsScreen';
import AddCardScreen from './AddCardScreen';

const RouterNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    AddDeck: AddDeckScreen,
    DeckDetails: DeckDetailsScreen,
    AddCard: AddCardScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerBackTitle: null
    }
  }
);

export default RouterNavigation;
