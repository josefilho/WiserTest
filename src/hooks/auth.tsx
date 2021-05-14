import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface UserState {
  user: {
    email: string;
    password: string;
  };
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface IResponseProps {
  id: string | number;
  email: string;
  password: string;
  name: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UserState>({} as UserState);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.get<IResponseProps[]>('users');

    const user = response.data.find(element => element.email === email);

    if (user?.password === password && user) {
      setData({
        user: {
          email: user.email,
          password: user.password,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
