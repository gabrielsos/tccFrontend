import React, { useState, useEffect, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Content, ContentHeader, AsideContainer } from './styles';
import Button from '../../components/Button';

interface osRegisterData {
  osId: number;
  name: string;
  osRegisterDescription: string;
  osRegisterDate: string;
  rightDate: string;
}

const Profile: React.FC = () => {
  const history = useHistory();

  const [osRegisters, setOsRegisters] = useState<osRegisterData[]>([]);

  useEffect(() => {
    async function loadData() {
      const name = localStorage.getItem('name');
      const osIdRegister = localStorage.getItem('osIdRegister');

      if (name) {
        const response = await api.get(`profile/registers/${osIdRegister}`);

        setOsRegisters(response.data);
      }
    }

    loadData();
  }, []);

  const handleNewRegister = useCallback(() => {
    const osId = localStorage.getItem('osIdRegister');

    history.push(`/admin/os/${osId}/new`);
  }, [history]);

  return (
    <Container>
      <Header />
      <Content>
        <ContentHeader>
          <AsideContainer>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <h1>Total de registros: {osRegisters.length}</h1>
            <FiArrowLeft
              size={24}
              color="#ff9000"
              onClick={() => history.push('/admin')}
            />
          </AsideContainer>
          <Button type="button" onClick={handleNewRegister}>
            Novo registro
          </Button>
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

export default Profile;
