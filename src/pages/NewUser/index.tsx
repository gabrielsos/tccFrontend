import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface LocalData {
  localId: number;
  localName: string;
}

const NewUser: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [loginName, setLoginName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('5');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (
        name !== '' &&
        loginName !== '' &&
        email !== '' &&
        selectedUserType !== '5'
      ) {
        try {
          await api.post('users/new', {
            name,
            loginName,
            email,
            userType: selectedUserType,
          });

          history.goBack();
        } catch (err) {
          alert('Nome de usuário e/ou e-mail já cadastrado');
        }
      } else {
        alert('Preencha todos os campos.');
      }
    },
    [email, history, loginName, name, selectedUserType],
  );

  const handleSelectUserType = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const userType = event.target.value;

      setSelectedUserType(userType);
    },
    [],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Criação de usuário</h1>
            <FiArrowLeft size={24} color="#ff9000" onClick={history.goBack} />

            <select
              value={selectedUserType}
              onChange={handleSelectUserType}
              name="local"
              id="local"
            >
              <option value="5">Tipo de usuário</option>
              <option value="0">Administrador</option>
              <option value="1">Usuário</option>
            </select>

            <input
              placeholder="Digite o nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              placeholder="Digite o usuário"
              value={loginName}
              onChange={e => setLoginName(e.target.value)}
            />

            <input
              placeholder="Digite o e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button type="submit">Confirmar</Button>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default NewUser;
