import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Content, ContentHeader } from './styles';

interface osRegisterData {
  osId: number;
  name: string;
  osRegisterDescription: string;
  rightDate: string;
  osRegisterDate: string;
}

const Registers: React.FC = () => {
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

  return (
    <Container>
      <Header />
      <Content>
        <ContentHeader>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <h1>Total de registros: {osRegisters.length}</h1>
          <FiArrowLeft size={24} color="#ff9000" onClick={history.goBack} />
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

export default Registers;
