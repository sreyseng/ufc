import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList } from 'react-native';
import styled from 'styled-components';
import { getDecks, addDeck, resetDecks } from './actions';
import Card from './components/Card';

const Container = styled.View`
  flex: 1;
`;

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Decks'
  };

  componentWillMount() {
    this.props.getDecks();
    // this.props.addDeck('NodeJS');
    // this.props.resetDecks();
  }

  renderItem = ({ item }) => {
    return <Card item={item} />;
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
          <Button
            title="Add deck"
            onPress={() => this.props.navigation.navigate('AddDeck')}
          />
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
