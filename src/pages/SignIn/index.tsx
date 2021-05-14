import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  Content,
  Background,
  Title,
  SubTitle,
  Form,
  Button,
  Forgot,
  SignUp,
} from './styles';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { addToast } = useToast();
  const { signIn } = useAuth();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);

        history.push('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Cheque os dados inseridos',
          });

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <Background />
      <Content>
        <Title>
          Olá, seja <br /> bem-vindo!
        </Title>
        <SubTitle>
          Para acessar a plataforma,
          <br />
          faça seu login.
        </SubTitle>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <strong>E-MAIL</strong>
          <Input name='email' placeholder='Informe o email' />

          <strong>SENHA</strong>
          <Input
            name='password'
            placeholder='Informe a senha'
            type='password'
          />

          <Button type='submit'>ENTRAR</Button>
        </Form>

        <Forgot>
          Esqueceu seu login ou senha?
          <br /> Clique <Link to='/forgot'>aqui</Link>
        </Forgot>
        <SignUp>
          <Link to='/signup'>Faça seu cadastro</Link>
        </SignUp>
      </Content>
    </Container>
  );
};

export default SignIn;
