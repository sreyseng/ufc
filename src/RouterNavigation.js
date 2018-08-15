import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import AddDeckScreen from './AddDeckScreen';
import DeckDetailsScreen from './DeckDetailsScreen';
import AddCardScreen from './AddCardScreen';
import QuizScreen from './QuizScreen';

const RouterNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    AddDeck: AddDeckScreen,
    DeckDetails: DeckDetailsScreen,
    AddCard: AddCardScreen,
    Quiz: QuizScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerBackTitle: null
    }
  }
);

export default RouterNavigation;
