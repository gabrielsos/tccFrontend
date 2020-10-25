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

interface equipmentData {
  equipmentSerialNumber: string;
  equipmentName: string;
  localName: string;
  localId: number;
}

const Equipments: React.FC = () => {
  const history = useHistory();

  const [equipmentsResponse, setEquipmentsResponse] = useState<equipmentData[]>(
    [],
  );

  useEffect(() => {
    async function loadData() {
      const response = await api.get('equipment');

      setEquipmentsResponse(response.data);
    }

    loadData();
  }, [equipmentsResponse]);

  const handleNewEquipment = useCallback(() => {
    history.push(`/admin/equipamentos/new`);
  }, [history]);

  const handleDelete = useCallback(async (equipmentSerialNumber: string) => {
    try {
      await api.delete(`equipment/${equipmentSerialNumber}`);
    } catch {
      alert('Não é possível excluir um local que já possuí registros');
    }
  }, []);

  const handleUpdate = useCallback(
    async (id: string, name: string, localId: number) => {
      localStorage.setItem('equipmentSerialNumber', id);
      localStorage.setItem('equipmentName', name);
      localStorage.setItem('localId', String(localId));

      history.push(`/admin/equipamentos/update`);
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
            <h1>Total de equipamentos: {equipmentsResponse.length}</h1>
          </AsideContainer>
          <Button type="button" onClick={handleNewEquipment}>
            Novo equipamento
          </Button>
        </ContentHeader>
        <ul>
          {equipmentsResponse.map(equipment => (
            <>
              <li key={equipment.equipmentSerialNumber}>
                <NameContainer>
                  <strong>Nome</strong>
                  <p>{equipment.equipmentName}</p>
                  <strong>Número de série</strong>
                  <p>{equipment.equipmentSerialNumber}</p>
                  <strong>Local</strong>
                  <p>{equipment.localName}</p>
                </NameContainer>
                <ButtonsContainer>
                  <FiEdit
                    size={24}
                    color="#fff"
                    onClick={() =>
                      handleUpdate(
                        equipment.equipmentSerialNumber,
                        equipment.equipmentName,
                        equipment.localId,
                      )}
                  />
                  <FiTrash
                    size={24}
                    color="#fff"
                    onClick={() =>
                      handleDelete(equipment.equipmentSerialNumber)}
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

export default Equipments;
