import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';

const CardContainer = styled.View`
  border-width: 1px;
  border-radius: 2px;
  border-color: #ddd;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
`;

const CardTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const CardContent = styled.Text`
  font-size: 16px;
`;

class Card extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={
          this.props.onPressItem && (() => this.props.onPressItem(item))
        }>
        <CardContainer>
          <CardTitle>{item.title}</CardTitle>
          <CardContent>{item.questions.length} Cards</CardContent>
        </CardContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default Card;
