import React, { Component } from 'react';
import { TouchableWithoutFeedback, Animated, View } from 'react-native';
import styled from 'styled-components';

const CardContainer = styled.View`
  border-width: 1px;
  border-radius: 2px;
  border-color: #ddd;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  flex-direction: row;
`;

const CardContent = styled.Text`
  font-size: 16px;
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: new Animated.Value(20)
    };
  }

  animate = (item) => {
    this.state.fontSize.setValue(20);

    Animated.timing(this.state.fontSize, {
      toValue: 30,
      duration: 1000
    }).start(() => {
      this.state.fontSize.setValue(20);
      this.props.onPressItem(item);
    });
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPressItem && (() => this.animate(item))}>
        <CardContainer>
          <View style={{ flex: 1 }}>
            <Animated.Text
              style={{
                fontSize: this.state.fontSize,
                fontWeight: 'bold'
              }}>
              {item.title}
            </Animated.Text>
            <CardContent>{item.questions.length} Cards</CardContent>
          </View>
        </CardContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default Card;
