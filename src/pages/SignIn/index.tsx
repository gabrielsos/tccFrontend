import React, { useCallback, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

const SignIn: React.FC = () => {
  const history = useHistory();

  const [loginName, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const response = await api.post('sessions', {
          loginName,
          password,
        });

        console.log(response.data.userType);

        localStorage.setItem('loginName', response.data.loginName);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('userType', response.data.userType);

        if (
          response.data.passwordExpired === 1 &&
          response.data.userType === 0
        ) {
          history.push('/new-password');
        } else if (
          response.data.passwordExpired === 1 &&
          response.data.userType === 1
        ) {
          history.push('/new-password');
        } else if (response.data.userType === 1) {
          history.push('/profile');
        } else {
          history.push('/admin/home');
          console.log('oii');
        }
      } catch (er) {
        alert('Usuário e/ou senha inválidos.');
      }
    },
    [loginName, password, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <input
              placeholder="Digite seu usuário"
              value={loginName}
              onChange={e => setUser(e.target.value)}
            />

            <input
              placeholder="Digite a senha"
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
