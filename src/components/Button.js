import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.TouchableOpacity`
  border-radius: 5px;
  border: ${(props) => (props.secondary ? '1px #ff7961' : '1px blue')};
  margin: 5px;
  background-color: ${(props) => (props.secondary ? '#ba000d' : '#273377')};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  padding-bottom: 10px;
  padding-top: 10px;
  font-weight: bold;
  text-align: center;
`;

const Button = ({ children, onPress, secondary }) => {
  return (
    <ButtonContainer onPress={onPress} secondary={secondary}>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;
