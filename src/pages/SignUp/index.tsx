import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Content,
  Background,
  Title,
  SubTitle,
  Form,
  Button,
} from './styles';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .required('Nome obrigatório')
            .min(2, 'Nome muito curto')
            .max(50, 'Nome muito longo'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(8, 'No mínimo 8 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no WiserTest!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
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
          faça seu cadastro.
        </SubTitle>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <strong>NOME</strong>
          <Input name='name' placeholder='Informe o seu nome' />

          <strong>E-MAIL</strong>
          <Input name='email' placeholder='Informe o email' />

          <strong>SENHA</strong>
          <Input
            name='password'
            placeholder='Informe a senha'
            type='password'
          />

          <Button type='submit'>CADASTRAR</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;
