import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Content, ContentHeader, AsideContainer } from './styles';
import Button from '../../components/Button';
import NotButton from '../../components/NotButton';
import HeaderMenu from '../../components/HeaderMenu';

interface osRegisterData {
  osId: number;
  name: string;
  osRegisterDescription: string;
  osRegisterDate: string;
  rightDate: string;
}

const AdminRegisters: React.FC = () => {
  const history = useHistory();

  const [osRegisters, setOsRegisters] = useState<osRegisterData[]>([]);
  const [isFinished, setIsFinished] = useState(Boolean);

  useEffect(() => {
    async function loadData() {
      const name = localStorage.getItem('name');
      const osIdRegister = localStorage.getItem('osIdRegister');
      const osStateName = localStorage.getItem('osStateName');

      if (name) {
        if (osStateName === 'Encerrada') {
          setIsFinished(true);
        }

        const response = await api.get(`profile/registers/${osIdRegister}`);
        setOsRegisters(response.data);
      }
    }

    loadData();
  }, [isFinished]);

  const handleNewRegister = useCallback(() => {
    const osId = localStorage.getItem('osIdRegister');

    history.push(`/admin/os/${osId}/new`);
  }, [history]);

  return (
    <Container>
      <Header />
      <HeaderMenu />
      <Content>
        <ContentHeader>
          <AsideContainer>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <h1>Total de registros: {osRegisters.length}</h1>
          </AsideContainer>
          {isFinished === false ? (
            <Button type="button" onClick={handleNewRegister}>
              Novo registro
            </Button>
          ) : (
            <NotButton>Novo Registro</NotButton>
          )}
        </ContentHeader>
        <ul>
          {osRegisters.map(o => (
            <li key={o.osRegisterDate}>
              <strong>Responsável pelo registro</strong>
              <p>{o.name}</p>

              <strong>Descrição</strong>
              <p>{o.osRegisterDescription}</p>

              <strong>Data</strong>
              <p>{o.rightDate}</p>
            </li>
          ))}
        </ul>
      </Content>
    </Container>
  );
};

export default AdminRegisters;
