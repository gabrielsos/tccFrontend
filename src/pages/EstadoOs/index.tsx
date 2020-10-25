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

interface osStateData {
  osStateId: number;
  osStateName: string;
}

const EstadoOs: React.FC = () => {
  const history = useHistory();

  const [osState, setosState] = useState<osStateData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('osStates');

      setosState(response.data);
    }

    loadData();
  }, [osState]);

  const handleNewOsState = useCallback(() => {
    history.push(`/admin/estado-os/new`);
  }, [history]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await api.delete(`osstate/${id}`);
    } catch {
      alert('Não é possível excluir um dado que já possuí registros');
    }
  }, []);

  const handleUpdate = useCallback(
    async (id: number, name: string) => {
      localStorage.setItem('osStateId', String(id));
      localStorage.setItem('osStateName', name);

      history.push(`/admin/estado-os/update`);
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
            <h1>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              Total de estados de ordem de serviço: {osState.length}
            </h1>
          </AsideContainer>
          <Button type="button" onClick={handleNewOsState}>
            Novo estado de ordem de serviço
          </Button>
        </ContentHeader>
        <ul>
          {osState.map(state => (
            <>
              <li key={state.osStateId}>
                <NameContainer>
                  <strong>Nome</strong>
                  <p>{state.osStateName}</p>
                </NameContainer>
                <ButtonsContainer>
                  <FiEdit
                    size={24}
                    color="#fff"
                    onClick={() =>
                      handleUpdate(state.osStateId, state.osStateName)
                    }
                  />
                  <FiTrash
                    size={24}
                    color="#fff"
                    onClick={() => handleDelete(state.osStateId)}
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

export default EstadoOs;
