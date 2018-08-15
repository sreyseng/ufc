import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.TouchableOpacity`
  border-radius: 5px;
  border: 1px blue;
  margin: 5px;
  background-color: #273377;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  padding-bottom: 10px;
  padding-top: 10px;
  font-weight: bold;
  text-align: center;
`;

const Button = ({ children, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
};

export default Button;
