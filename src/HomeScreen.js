import React, { Component } from 'react';
import { connect } from 'react-redux';
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

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(HomeScreen);
