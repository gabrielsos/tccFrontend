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

interface localsData {
  localId: number;
  localName: string;
}

const Locals: React.FC = () => {
  const history = useHistory();

  const [localResponse, setLocalResponse] = useState<localsData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('local');

      setLocalResponse(response.data);
    }

    loadData();
  }, [localResponse]);

  const handleNewLocal = useCallback(() => {
    history.push(`/admin/locais/new`);
  }, [history]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await api.delete(`locals/${id}`);
    } catch {
      alert('Não é possível excluir um local que já possuí registros');
    }
  }, []);

  const handleUpdate = useCallback(
    async (id: number, name: string) => {
      localStorage.setItem('localId', String(id));
      localStorage.setItem('localName', String(name));

      history.push(`/admin/locais/update`);
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
            <h1>Total de locais: {localResponse.length}</h1>
          </AsideContainer>
          <Button type="button" onClick={handleNewLocal}>
            Novo local
          </Button>
        </ContentHeader>
        <ul>
          {localResponse.map(local => (
            <>
              <li key={local.localId}>
                <NameContainer>
                  <strong>Nome</strong>
                  <p>{local.localName}</p>
                </NameContainer>
                <ButtonsContainer>
                  <FiEdit
                    size={24}
                    color="#fff"
                    onClick={() => handleUpdate(local.localId, local.localName)}
                  />
                  <FiTrash
                    size={24}
                    color="#fff"
                    onClick={() => handleDelete(local.localId)}
                  />
                </ButtonsContainer>
              </li>
            </>
          ))}
        </ul>
      </Content>
    </Container>
  );
};

export default Locals;
