import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import styled from 'styled-components';
import Card from './components/Card';
import Button from './components/Button';

const Container = styled.View`
  flex: 1;
`;

const ErrorText = styled.Text`
  font-size: 14;
  margin: 5px;
  color: red;
  text-align: center;
`;

class DeckDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item', null);
    const title = item ? item.title : 'Deck Details';
    return {
      title
    };
  };

  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  handleAddCard = (title) => {
    this.setState({
      error: ''
    });
    this.props.navigation.navigate('AddCard', {
      title
    });
  };

  handleStartQuiz = (item) => {
    console.log('start quiz', item);
    if (item && item.questions.length === 0) {
      this.setState({
        error: 'You have no cards for practice! Please add some first.'
      });
    } else {
      this.props.navigation.navigate('Quiz', {
        item
      });
    }
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
        {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
        <Button onPress={() => this.handleAddCard(item.title)}>Add Card</Button>
        <Button onPress={() => this.handleStartQuiz(item)}>Start Quiz</Button>
      </Container>
    );
  }
}

export default DeckDetailsScreen;
