import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiX } from 'react-icons/fi';

import { Container, InputContainer, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container data-testid='input-container'>
      <InputContainer isErrored={!!error} data-testid='input-container-style'>
        <input ref={inputRef} defaultValue={defaultValue} {...rest} />
        <FiX color='#ff377f' size={20} />
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Input;
