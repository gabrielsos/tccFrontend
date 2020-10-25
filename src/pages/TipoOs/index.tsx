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

interface osTypeData {
  osTypeId: number;
  typeName: string;
}

const TipoOs: React.FC = () => {
  const history = useHistory();

  const [osTypes, setosTypes] = useState<osTypeData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('osTypes');

      setosTypes(response.data);
    }

    loadData();
  }, [osTypes]);

  const handleNewOsType = useCallback(() => {
    history.push(`/admin/tipo-os/new`);
  }, [history]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await api.delete(`ostype/${id}`);
    } catch {
      alert('Não é possível excluir um dado que já possuí registros');
    }
  }, []);

  const handleUpdate = useCallback(
    async (id: number, name: string) => {
      localStorage.setItem('osTypeId', String(id));
      localStorage.setItem('typeName', name);

      history.push(`/admin/tipo-os/update`);
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
            <h1>Total de tipos de ordem de serviço: {osTypes.length}</h1>
          </AsideContainer>
          <Button type="button" onClick={handleNewOsType}>
            Novo tipo de ordem de serviço
          </Button>
        </ContentHeader>
        <ul>
          {osTypes.map(type => (
            <>
              <li key={type.osTypeId}>
                <NameContainer>
                  <strong>Nome</strong>
                  <p>{type.typeName}</p>
                </NameContainer>
                <ButtonsContainer>
                  <FiEdit
                    size={24}
                    color="#fff"
                    onClick={() => handleUpdate(type.osTypeId, type.typeName)}
                  />
                  <FiTrash
                    size={24}
                    color="#fff"
                    onClick={() => handleDelete(type.osTypeId)}
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

export default TipoOs;
