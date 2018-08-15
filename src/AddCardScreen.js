import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import validator from 'validator';
import { addCardToDeck } from './actions';
import { isEmpty } from 'rxjs/operators';
import { isValid } from 'ipaddr.js';

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

validateFields = (fieldType, value) => {
  const errors = [];

  if (validator.isEmpty(value)) {
    errors.push(`${fieldType} cannot be empty`);
  }

  if (!validator.isLength(value, { min: 2, max: 250 })) {
    errors.push(`${fieldType} must be between 2 and 250 characters.`);
  }

  return errors;
};

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
    this.setState({
      [prop]: value,
      errors: { ...this.state.errors, [prop]: [] }
    });
  };

  handleAddCard = () => {
    const { question, answer } = this.state;
    let errors = { question: [], answer: [] };

    errors.question = validateFields('Question', question);
    errors.answer = validateFields('Answer', answer);

    if (errors.question.length > 0 || errors.answer.length > 0) {
      this.setState({ errors });
    } else {
      const title = this.props.navigation.getParam('title', null);
      const card = {
        question: this.state.question,
        answer: this.state.answer
      };

      this.props.addCardToDeck(title, card, (callback) => {
        console.log('done....');
        this.props.navigation.navigate('DeckDetails', {
          item: this.props.decks[title]
        });
      });
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

        <Button title="Add Card" onPress={this.handleAddCard} />
      </Container>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  };
}

export default connect(
  mapStateToProps,
  { addCardToDeck }
)(AddCardScreen);
