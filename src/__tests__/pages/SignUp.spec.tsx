import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import SignUp from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('../../services/api', () => {
  return {
    post: jest.fn(),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign up', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Informe o seu nome');
    const emailField = getByPlaceholderText('Informe o email');
    const passwordField = getByPlaceholderText('Informe a senha');
    const buttonElement = getByText('CADASTRAR');

    fireEvent.change(nameField, { target: { value: 'Nome Valido' } });
    fireEvent.change(emailField, { target: { value: 'valid@mail.com' } });
    fireEvent.change(passwordField, { target: { value: '12345678' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to sign up with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Informe o seu nome');
    const emailField = getByPlaceholderText('Informe o email');
    const passwordField = getByPlaceholderText('Informe a senha');
    const buttonElement = getByText('CADASTRAR');

    fireEvent.change(nameField, { target: { value: 'A' } });
    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '12345' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
