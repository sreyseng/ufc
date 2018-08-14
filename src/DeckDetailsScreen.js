import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class DeckDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item', null);
    const title = item ? item.title : 'Deck Details';
    return {
      title
    };
  };

  render() {
    return (
      <View>
        <Text>{this.props.navigation.getParam('item', null).title}</Text>
      </View>
    );
  }
}

export default DeckDetailsScreen;
