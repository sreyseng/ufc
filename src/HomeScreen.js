import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';
import { getDecks, addDeck, resetDecks } from './actions';
import Card from './components/Card';
import Button from './components/Button';

const Container = styled.View`
  flex: 1;
`;

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Decks'
  };

  componentWillMount() {
    this.props.getDecks();
  }

  renderItem = ({ item }) => {
    return <Card item={item} onPressItem={this.onPressItem} />;
  };

  onPressItem = (item) => {
    this.props.navigation.navigate('DeckDetails', { item });
  };

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.decks}
            renderItem={this.renderItem}
            keyExtractor={(deck, index) => index.toString()}
          />
        </View>
        <View>
          <Button onPress={() => this.props.navigation.navigate('AddDeck')}>
            Add Deck
          </Button>
        </View>
      </Container>
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
  { getDecks, addDeck, resetDecks }
)(HomeScreen);
