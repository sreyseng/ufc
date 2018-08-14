import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList } from 'react-native';
import { getDecks, addDeck } from './actions';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Decks'
  };

  componentWillMount() {
    this.props.getDecks();
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.questions.length}</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <Text>Homescreen</Text>

        <Button
          title="Add deck"
          onPress={() => this.props.addDeck(new Date().getMilliseconds())}
        />

        <FlatList
          data={this.props.decks}
          renderItem={this.renderItem}
          keyExtractor={(deck, index) => index.toString()}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const decks = state.decks ? _.map(state.decks) : [];

  return {
    decks
  };
}

export default connect(
  mapStateToProps,
  { getDecks, addDeck }
)(HomeScreen);
