import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import validator from 'validator';
import { addCardToDeck } from './actions';
import Button from './components/Button';
import Input from './components/Input';

const Container = styled.View`
  flex: 1;
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
        this.props.navigation.navigate('DeckDetails', {
          item: this.props.decks[title]
        });
      });
    }
  };

  render() {
    return (
      <Container>
        <Input
          label="Question"
          placeholder="Enter Question"
          value={this.state.question}
          onChangeText={this.handleTextChange}
          errors={this.state.errors.question}
          fieldType="question"
        />

        <Input
          label="Answer"
          placeholder="Enter Answer"
          value={this.state.answer}
          onChangeText={this.handleTextChange}
          errors={this.state.errors.answer}
          fieldType="answer"
        />

        <Button onPress={this.handleAddCard}>Add Card</Button>
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
