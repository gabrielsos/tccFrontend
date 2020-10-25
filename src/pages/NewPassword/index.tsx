import React, { useCallback, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

const NewPassword: React.FC = () => {
  const history = useHistory();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const loginName = localStorage.getItem('loginName');

      if (passwordConfirm === password) {
        try {
          history.push('/');

          await api.post('/sessions/newPassword', {
            password,
            loginName,
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        alert('As senhas precisam ser iguais.');
      }
    },
    [passwordConfirm, password, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Mudança de senha</h1>

            <input
              placeholder="Digite sua nova senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <input
              placeholder="Confirme a nova senha"
              value={passwordConfirm}
              type="password"
              onChange={e => setPasswordConfirm(e.target.value)}
            />
            <Button type="submit">Entrar</Button>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default NewPassword;
