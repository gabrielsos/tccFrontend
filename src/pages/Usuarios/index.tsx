import React, { useState, useEffect, useCallback } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import HeaderMenu from '../../components/HeaderMenu';
import Header from '../../components/Header';

import {
  Container,
  Content,
  ContentHeader,
  AsideContainer,
  ButtonsContainer,
  NameContainer,
} from './styles';
import Button from '../../components/Button';

interface AccountData {
  loginName: string;
  name: string;
  email: string;
  userType: string;
}

const Users: React.FC = () => {
  const history = useHistory();

  const [admin, setAdmin] = useState<AccountData[]>([]);
  const [users, setUsers] = useState<AccountData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('admin');

      setAdmin(response.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('users');

      setUsers(response.data);
    }

    loadData();
  }, []);

  const handleNewUser = useCallback(() => {
    history.push(`/admin/usuarios/new`);
  }, [history]);

  const handleDelete = useCallback(
    async (loginName: string) => {
      try {
        await api.delete(`users/${loginName}`);

        const newUsers = users.filter(user => user.loginName !== loginName);
        const newAdm = admin.filter(adm => adm.loginName !== loginName);

        setUsers(newUsers);
        setAdmin(newAdm);
      } catch {
        alert('Não é possível excluir um usuário que já possuí registros');
      }
    },
    [admin, users],
  );

  const handleUpdate = useCallback(
    async (id: string, name: string, email: string, userType: string) => {
      localStorage.setItem('loginName', id);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('userType', userType);

      history.push(`/admin/usuarios/update`);
    },
    [history],
  );

  return (
    <Container>
      <Header />
      <HeaderMenu />
      <Content>
        <ContentHeader>
          <AsideContainer>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <h1>Total de usuários: {admin.length + users.length}</h1>
          </AsideContainer>
          <Button type="button" onClick={handleNewUser}>
            Novo usuário
          </Button>
        </ContentHeader>
        <ul>
          <h1>Administradores:</h1>
          {admin.map(adm => (
            <li key={adm.loginName}>
              <NameContainer>
                <strong>Nome</strong>
                <p>{adm.name}</p>

                <strong>Nome de usuário</strong>
                <p>{adm.loginName}</p>

                <strong>E-mail</strong>
                <p>{adm.email}</p>
              </NameContainer>
              <ButtonsContainer>
                <FiEdit
                  size={24}
                  color="#fff"
                  onClick={() =>
                    handleUpdate(
                      adm.loginName,
                      adm.name,
                      adm.email,
                      adm.userType,
                    )}
                />
                <FiTrash
                  size={24}
                  color="#fff"
                  onClick={() => handleDelete(adm.loginName)}
                />
              </ButtonsContainer>
            </li>
          ))}
        </ul>

        <ul>
          <h1>Usuários:</h1>
          {users.map(user => (
            <li key={user.loginName}>
              <NameContainer>
                <strong>Nome</strong>
                <p>{user.name}</p>

                <strong>Nome de usuário</strong>
                <p>{user.loginName}</p>

                <strong>E-mail</strong>
                <p>{user.email}</p>
              </NameContainer>
              <ButtonsContainer>
                <FiEdit
                  size={24}
                  color="#fff"
                  onClick={() =>
                    handleUpdate(
                      user.loginName,
                      user.name,
                      user.email,
                      user.userType,
                    )}
                />
                <FiTrash
                  size={24}
                  color="#fff"
                  onClick={() => handleDelete(user.loginName)}
                />
              </ButtonsContainer>
            </li>
          ))}
        </ul>
      </Content>
    </Container>
  );
};

export default Users;
