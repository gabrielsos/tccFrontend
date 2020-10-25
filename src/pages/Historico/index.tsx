import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import HeaderMenu from '../../components/HeaderMenu';
import Header from '../../components/Header';

import { Container, Content, ContentHeader, AsideContainer } from './styles';
import Button from '../../components/Button';

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

const Historico: React.FC = () => {
  const history = useHistory();

  const [allOs, setallOs] = useState<osData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('all-os');

      setallOs(response.data);
    }

    loadData();
  }, []);

  const handleNewOs = useCallback(() => {
    history.push('/admin/os/new');
  }, [history]);

  const handleShowRegisters = useCallback(
    (id: string, osDateInit: string, osStateName: string) => {
      localStorage.setItem('osIdRegister', id);
      localStorage.setItem('osStateName', osStateName);
      localStorage.setItem('osDateInit', osDateInit);
    },
    [],
  );

  return (
    <Container>
      <Header />
      <HeaderMenu />
      <Content>
        <ContentHeader>
          <AsideContainer>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <h1>Total de ordens de serviço: {allOs.length}</h1>
          </AsideContainer>
          <Button type="button" onClick={handleNewOs}>
            Nova ordem de serviço
          </Button>
        </ContentHeader>
        <ul>
          {allOs.map(o => (
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

                <strong>Data de encerramento</strong>
                <p>{o.rightFinalDate}</p>
              </li>
            </Link>
          ))}
        </ul>
      </Content>
    </Container>
  );
};

export default Historico;
