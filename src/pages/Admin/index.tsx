import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';

import HeaderMenu from '../../components/HeaderMenu';

import api from '../../services/api';

import { Container, Content, ContentHeader } from './styles';

interface osData {
  osId: number;
  initDate: string;
  localName: string;
  osDescription: string;
  name: string;
  equip: string;
  osStateName: string;
  rightFinalDate: string | null;
  rightInitDate: string;
  typeName: string;
}

const Admin: React.FC = () => {
  const [os, setOs] = useState<osData[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const name = localStorage.getItem('name');
      const userName = localStorage.getItem('loginName');

      if (name) {
        const response = await api.get('os', {
          headers: {
            authorization: userName,
          },
        });

        setOs(response.data);
      }
    }

    loadData();
  }, []);

  const handleShowRegisters = useCallback(
    (id: string, osDateInit: string, osStateName: string) => {
      localStorage.setItem('osIdRegister', id);
      localStorage.setItem('osDateInit', osDateInit);
      localStorage.setItem('osStateName', osStateName);
    },
    [],
  );

  const handleNewOs = useCallback(() => {
    history.push('/admin/os/new');
  }, [history]);

  return (
    <Container>
      <Header />
      <HeaderMenu />
      <Content>
        <ContentHeader>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <h1>Total de ordens de serviço não encerradas: {os.length}</h1>
          <Button type="button" onClick={handleNewOs}>
            Nova ordem de serviço
          </Button>
        </ContentHeader>
        <ul>
          {os.map(o => (
            <Link
              to={`/admin/os/${o.osId}`}
              onClick={() =>
                handleShowRegisters(String(o.osId), o.initDate, o.osStateName)}
            >
              <li key={o.osId}>
                <strong>Status</strong>
                <p>{o.osStateName}</p>

                <strong>Solicitante:</strong>
                <p>{o.name}</p>

                <strong>Data de abertura</strong>
                <p>{o.rightInitDate}</p>

                <strong>Descrição</strong>
                <p>{o.osDescription}</p>

                <strong>Local</strong>
                <p>{o.localName}</p>

                <strong>Equipamento(s)</strong>
                <p>{o.equip}</p>
              </li>
            </Link>
          ))}
        </ul>
      </Content>
    </Container>
  );
};

export default Admin;
