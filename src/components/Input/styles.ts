import styled, { css } from 'styled-components';

interface InputContainerProps {
  isErrored: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 256px;
`;

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  border: 1px solid #989fdb;
  border-radius: 8px;
  height: 48px;

  align-items: center;
  justify-content: center;

  input {
    color: #383e71;
    background: transparent;
    width: 200px;
    border: 0;

    &::placeholder {
      font-size: 14px;
    }
  }

  svg {
    visibility: hidden;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #ff377f;

      svg {
        visibility: visible;
      }
    `}
`;

export const Error = styled.span`
  margin-left: 17px;
  margin-top: 8px;
  font-size: 10px;

  color: #ff377f;
`;
