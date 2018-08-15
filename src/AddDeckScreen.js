import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import validator from 'validator';
import { addDeck } from './actions';
import Button from './components/Button';

const Container = styled.View`
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
`;

const Input = styled.TextInput`
  height: 40px;
  border: ${(props) => (props.error == true ? '1px red' : '1px gray')}
  margin-top: 10px;
`;

const InputLabel = styled.Text`
  font-size: 20;
  margin-top: 10px;
`;

const ErrorText = styled.Text`
  font-size: 14;
  margin: 5px;
  color: red;
  text-align: center;
`;

class AddDeckScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { deckTitle: '', errors: [] };
  }

  static navigationOptions = {
    title: 'Add Deck'
  };

  handleTextChange = (deckTitle) => {
    this.setState({
      deckTitle,
      errors: []
    });
  };

  handleAddDeck = () => {
    const { deckTitle } = this.state;
    const errors = [];

    if (validator.isEmpty(deckTitle)) {
      errors.push('Deck title cannot be empty.');
    }

    if (!validator.isLength(deckTitle, { min: 2, max: 50 })) {
      errors.push('Deck title must be between 2 and 50 characters.');
    }
    console.log(errors.length);
    if (errors.length > 0) {
      this.setState({ errors });
    } else {
      this.props.addDeck(deckTitle);
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <Container>
        <InputLabel>Title</InputLabel>
        <Input
          placeholder="Enter deck title"
          value={this.state.deckTitle}
          onChangeText={this.handleTextChange}
          error={this.state.errors.length > 0 ? true : false}
        />
        {this.state.errors.length > 0 && (
          <ErrorText>{_.map(this.state.errors).join('\n')}</ErrorText>
        )}
        <Button onPress={this.handleAddDeck}>Add Deck</Button>
      </Container>
    );
  }
}

export default connect(
  null,
  { addDeck }
)(AddDeckScreen);
