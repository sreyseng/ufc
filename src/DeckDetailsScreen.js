import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Button } from 'react-native';
import styled from 'styled-components';
import Card from './components/Card';

const Container = styled.View`
  flex: 1;
`;

class DeckDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item', null);
    const title = item ? item.title : 'Deck Details';
    return {
      title
    };
  };

  handleAddCard = (title) => {
    this.props.navigation.navigate('AddCard', {
      title
    });
  };

  handleStartQuiz = () => {
    console.log('start quiz...');
  };

  render() {
    const item = this.props.navigation.getParam('item', null);
    if (!item) {
      return (
        <Container>
          <Text>An unexpected error occured. Please restart application.</Text>
        </Container>
      );
    }
    return (
      <Container>
        <Card item={item} />
        <Button
          title="Add Card"
          onPress={() => this.handleAddCard(item.title)}
        />
        <Button title="Start Quiz" onPress={this.handleStartQuiz} />
      </Container>
    );
  }
}

export default DeckDetailsScreen;
