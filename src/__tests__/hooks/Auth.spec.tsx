import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able sign in', async () => {
    apiMock.onGet('users').reply(200, [
      {
        id: '28',
        email: 'randommail@email.com',
        password: '12345678',
        name: 'Jhon Doe',
      },
    ]);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'randommail@email.com',
      password: '12345678',
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('randommail@email.com');
  });

  it('should not be able to sign in with invalid password', async () => {
    apiMock.onGet('users').reply(200, [
      {
        id: '28',
        email: 'randommail@email.com',
        password: '12345678',
        name: 'Jhon Doe',
      },
    ]);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(async () => {
      await result.current.signIn({
        email: 'randommail@email.com',
        password: '1234567',
      });
    }).rejects.toThrowError('Invalid credentials');
  });
});
