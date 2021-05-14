import styled, { keyframes } from 'styled-components';
import { Form as UnForm } from '@unform/web';

import SignInBackground from '../../assets/sign-in-background.png';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  animation: ${appearFromRight} 1s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;

export const Form = styled(UnForm)`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 12px;
    font-weight: 400;
    color: #383e71;

    margin: 16px 11px 8px;
  }
`;

export const Button = styled.button`
  height: 48px;
  width: 256px;
  margin-top: 24px;

  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;

  background: linear-gradient(267.79deg, #383e71 0%, #9d25b0 99.18%);
  border: 0;
  box-shadow: 0px 10px 25px #cf99db;
  border-radius: 8px;
  transition: all 0.4s;

  &:hover {
    box-shadow: 0px 0px 0px;
  }
`;

export const Title = styled.h1`
  width: 256px;

  font-size: 40px;
  line-height: 48px;
  color: #383e71;

  margin-bottom: 16px;
`;

export const SubTitle = styled.h3`
  width: 256px;

  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #989fdb;

  margin-bottom: 16px;
`;

export const Forgot = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #989fdb;

  margin-top: 32px;

  a {
    color: #9626ac;
  }
`;

export const SignUp = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #989fdb;

  margin-top: 32px;

  a {
    color: #9626ac;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignInBackground}) no-repeat center;
  background-size: cover;
`;
