import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { getDecks, createNewDeck } from './actions';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Decks'
  };

  componentWillMount() {
    this.props.createNewDeck('test 6');
  }

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

export default connect(
  mapStateToProps,
  { getDecks, createNewDeck }
)(HomeScreen);
