import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';

import api from '../../services/api';

import { Container, Content, ContentHeader } from './styles';

interface osData {
  osId: number;
  localName: string;
  osDescription: string;
  equip: string;
  osStateName: string;
  rightFinalDate: string | null;
  rightInitDate: string;
  typeName: string;
}

const Profile: React.FC = () => {
  const [os, setOs] = useState<osData[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const name = localStorage.getItem('name');
      const userName = localStorage.getItem('loginName');

      if (name) {
        const response = await api.get('profile', {
          headers: {
            authorization: userName,
          },
        });

        setOs(response.data);
      }
    }

    loadData();
  }, []);

  const handleShowRegisters = useCallback((id: string) => {
    localStorage.setItem('osIdRegister', id);
  }, []);

  const handleNewOs = useCallback(() => {
    history.push('profile/os/new');
  }, [history]);

  return (
    <Container>
      <Header />
      <Content>
        <ContentHeader>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <h1>Seu total de ordens de serviço: {os.length}</h1>
          <Button type="button" onClick={handleNewOs}>
            Nova ordem de serviço
          </Button>
        </ContentHeader>
        <ul>
          {os.map(o => (
            <Link
              to={`/profile/os/${o.osId}`}
              onClick={() => handleShowRegisters(String(o.osId))}
            >
              <li key={o.osId}>
                <strong>Status</strong>
                <p>{o.osStateName}</p>

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

export default Profile;
