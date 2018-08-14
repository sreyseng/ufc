import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import validator from 'validator';
import { addDeck } from './actions';
import { isEmpty } from 'rxjs/operators';

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

class AddCardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: '',
      errors: { question: [], answer: [] }
    };
  }

  static navigationOptions = {
    title: 'Add Card'
  };

  handleTextChange = (prop, value) => {
    console.log('prop', prop);
    console.log('value', value);
    this.setState({
      [prop]: value,
      errors: { ...this.state.errors, [prop]: [] }
    });
  };

  handleAddCard = () => {
    const { question, answer } = this.state;
    const errors = { question: [], answer: [] };

    if (validator.isEmpty(question)) {
      errors.question.push('Question cannot be empty');
    }

    if (validator.isEmpty(answer)) {
      errors.answer.push('Answer cannot be empty');
    }

    if (!validator.isLength(question, { min: 2, max: 250 })) {
      errors.question.push('Question must be between 2 and 250 characters.');
    }

    if (!validator.isLength(answer, { min: 2, max: 250 })) {
      errors.answer.push('Deck title must be between 2 and 250 characters.');
    }

    if (errors.question.length > 0 || errors.answer.length > 0) {
      this.setState({ errors });
    } else {
      console.log('adding card...', this.state);
      // this.props.addDeck(deckTitle);
      // this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <Container>
        <InputLabel>Question</InputLabel>
        <Input
          placeholder="Question"
          value={this.state.question}
          onChangeText={(value) => this.handleTextChange('question', value)}
          error={this.state.errors.question.length > 0 ? true : false}
        />
        {this.state.errors.question.length > 0 && (
          <ErrorText>{_.map(this.state.errors.question).join('\n')}</ErrorText>
        )}
        <InputLabel>Answer</InputLabel>
        <Input
          placeholder="Answer"
          value={this.state.answer}
          onChangeText={(value) => this.handleTextChange('answer', value)}
          error={this.state.errors.answer.length > 0 ? true : false}
        />
        {this.state.errors.answer.length > 0 && (
          <ErrorText>{_.map(this.state.errors.answer).join('\n')}</ErrorText>
        )}

        <Button title="Add Deck" onPress={this.handleAddCard} />
      </Container>
    );
  }
}

export default connect(
  null,
  { addDeck }
)(AddCardScreen);
