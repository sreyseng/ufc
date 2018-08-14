import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Decks'
  };

  render() {
    return (
      <View>
        <Text>Homescreen</Text>
      </View>
    );
  }
}

export default HomeScreen;
