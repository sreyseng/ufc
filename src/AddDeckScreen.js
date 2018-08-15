import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import validator from 'validator';
import { addDeck } from './actions';
import Button from './components/Button';
import Input from './components/Input';

const Container = styled.View`
  flex: 1;
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

    if (errors.length > 0) {
      this.setState({ errors });
    } else {
      this.props.addDeck(deckTitle, () => {
        this.props.navigation.replace('DeckDetails', {
          item: this.props.decks[deckTitle]
        });
      });
    }
  };

  render() {
    return (
      <Container>
        <Input
          label="Title"
          placeholder="Enter deck title"
          value={this.state.deckTitle}
          onChangeText={this.handleTextChange}
          errors={this.state.errors}
        />

        <Button onPress={this.handleAddDeck}>Add Deck</Button>
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
  { addDeck }
)(AddDeckScreen);
