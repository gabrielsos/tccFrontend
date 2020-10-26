/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';

import api from '../../services/api';

import HeaderMenu from '../../components/HeaderMenu';
import Header from '../../components/Header';

import {
  Container,
  Content,
  SearchContainer,
  FilterContainer,
  StatisticsContainer,
  DataContainer,
} from './styles';
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

interface LocalData {
  localId: number;
  localName: string;
}

interface EquipmentData {
  localId: number;
  equipmentName: string;
  equipmentSerialNumber: string;
}

const Historico: React.FC = () => {
  const [locals, setLocals] = useState<LocalData[]>([]);
  const [selectedLocal, setSelectedLocal] = useState('0');
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState('0');
  const [totalOsAbertas, setTotalAbertas] = useState(0);
  const [totalOsFechadas, setTotalFechadas] = useState(0);
  const [totalOsAguardandoPecas, setTotalOsAguardandoPecas] = useState(0);

  const [allOs, setallOs] = useState<osData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('all-os');

      setallOs(response.data);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const totalAbertas = allOs.filter(
        aberta => aberta.osStateName === 'Aberta',
      );

      setTotalAbertas(totalAbertas.length);
    }

    loadData();
  }, [allOs]);

  useEffect(() => {
    async function loadData() {
      const totalFechadas = allOs.filter(
        fechada => fechada.osStateName === 'Encerrada',
      );

      setTotalFechadas(totalFechadas.length);
    }

    loadData();
  }, [allOs]);

  useEffect(() => {
    async function loadData() {
      const totalAguardandoPecas = allOs.filter(
        aguardandoPecas => aguardandoPecas.osStateName === 'Aguardando Peças',
      );

      setTotalOsAguardandoPecas(totalAguardandoPecas.length);
    }

    loadData();
  }, [allOs]);

  const handleShowRegisters = useCallback(
    (id: string, osDateInit: string, osStateName: string) => {
      localStorage.setItem('osIdRegister', id);
      localStorage.setItem('osStateName', osStateName);
      localStorage.setItem('osDateInit', osDateInit);
    },
    [],
  );

  useEffect(() => {
    async function loadData() {
      const getLocals = await api.get('local');

      setLocals(getLocals.data);
    }

    loadData();
  }, []);

  const handleSelectEquipment = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const equipment = event.target.value;

      const index = event.target.selectedIndex;
      const equipmentName = event.target[index].textContent;

      if (equipmentName) {
        setSelectedEquipment(equipment);
      }
    },
    [],
  );

  const handleSelectLocal = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const local = event.target.value;

      setSelectedLocal(local);

      const response = await api.get(`equipment/local/${local}`);

      setSelectedEquipment('0');

      setEquipments(response.data);
    },
    [],
  );

  const handleSearchOsByEquipment = useCallback(async () => {
    const response = await api.get(`/os-serial-number/${selectedEquipment}`);

    setallOs(response.data);
  }, [selectedEquipment]);

  const handleCleanFilters = useCallback(async () => {
    async function loadData() {
      const response = await api.get('all-os');

      setallOs(response.data);

      setSelectedEquipment('0');
      setSelectedLocal('0');
    }

    loadData();
  }, []);

  const state = {
    series: [totalOsAbertas, totalOsFechadas, totalOsAguardandoPecas],
    oprions: {
      labels: ['Abertas', 'Encerradas', 'Aguardando Peças'],
    },
  };

  return (
    <Container>
      <Header />
      <HeaderMenu />
      <Content>
        <StatisticsContainer>
          <DataContainer>
            <h1>Total: {allOs.length}</h1>
            <h1>Abertas: {totalOsAbertas}</h1>
            <h1>Aguardando peças: {totalOsAguardandoPecas}</h1>
            <h1>Encerradas: {totalOsFechadas}</h1>
          </DataContainer>
          <Chart
            options={state.oprions}
            series={state.series}
            type="donut"
            width={300}
            height={320}
          />
        </StatisticsContainer>
        <SearchContainer>
          <h1>Filtrar por equipamento</h1>
          <FilterContainer>
            <select
              value={selectedLocal}
              onChange={handleSelectLocal}
              name="local"
              id="local"
            >
              <option value="0">Local</option>

              {locals.map(local => (
                <option key={local.localId} value={local.localId}>
                  {local.localName}
                </option>
              ))}
            </select>

            <select
              value={selectedEquipment}
              onChange={handleSelectEquipment}
              name="equipment"
              id="equipment"
            >
              <option value="0">Equipamento</option>

              {equipments.map(equipment => (
                <option
                  key={equipment.equipmentSerialNumber}
                  value={equipment.equipmentSerialNumber}
                >
                  {equipment.equipmentName}
                </option>
              ))}
            </select>

            <Button onClick={handleSearchOsByEquipment}>Confirmar</Button>
            <Button onClick={handleCleanFilters}>Limpar</Button>
          </FilterContainer>
        </SearchContainer>
        <ul>
          {allOs.map(o => (
            <Link
              key={o.osId}
              to={`/admin/os/${o.osId}`}
              onClick={() =>
                handleShowRegisters(String(o.osId), o.initDate, o.osStateName)
              }
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
