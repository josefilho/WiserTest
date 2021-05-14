import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import Input from '../../components/Input';

const mockedError = jest.fn().mockReturnValue('');

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: mockedError,
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  beforeEach(() => {
    mockedError.mockClear();
  });

  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name='email' placeholder='E-mail' />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should be able to render error', async () => {
    mockedError.mockReturnValue('E-mail inválido');

    const { getByTestId } = render(<Input name='email' placeholder='E-mail' />);

    const Container = getByTestId('input-container');
    const InputContainer = getByTestId('input-container-style');

    fireEvent.submit(Container);

    await waitFor(() => {
      expect(InputContainer).toHaveStyle('border-color: #ff377f');
    });
  });
});
