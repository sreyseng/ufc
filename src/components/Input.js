import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  margin-left: 5px;
  margin-right: 5px;
`;

const InputText = styled.TextInput`
  height: 40px;
  border: ${(props) => (props.error ? '1px red' : '1px gray')}
  margin-top: 10px;
  padding: 5px;
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

const Input = ({ label, placeholder, value, onChangeText, errors }) => {
  return (
    <Container>
      <InputLabel>Title</InputLabel>
      <InputText
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        error={errors && errors.length > 0}
      />
      {errors &&
        errors.length > 0 && <ErrorText>{_.map(errors).join('\n')}</ErrorText>}
    </Container>
  );
};

export default Input;
