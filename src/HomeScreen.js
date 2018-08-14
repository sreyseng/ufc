import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { getDecks, addDeck } from './actions';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Decks'
  };

  componentWillMount() {
    this.props.getDecks();
  }

  render() {
    return (
      <View>
        <Text>Homescreen</Text>

        <Button
          title="Add deck"
          onPress={() => this.props.addDeck(new Date().getMilliseconds())}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {};
}

export default connect(
  mapStateToProps,
  { getDecks, addDeck }
)(HomeScreen);
