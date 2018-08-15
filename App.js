import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import RouterNavigation from './src/RouterNavigation';
import { setLocalNotification } from './src/utils/NotificationsAPI';

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <RouterNavigation />
      </Provider>
    );
  }
}
