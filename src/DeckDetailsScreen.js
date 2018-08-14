import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
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

  render() {
    const item = this.props.navigation.getParam('item', null);
    return <Container />;
  }
}

export default DeckDetailsScreen;
