import React, {
  useCallback,
  useState,
  FormEvent,
  useEffect,
  ChangeEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  AddEquipmentContainer,
} from './styles';

interface LocalData {
  localId: number;
  localName: string;
}

interface EquipmentData {
  localId: number;
  equipmentName: string;
  equipmentSerialNumber: string;
}

interface OsTypeData {
  osTypeId: number;
  typeName: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();

  const [locals, setLocals] = useState<LocalData[]>([]);
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);
  const [addedEquipments, setAddedEquipments] = useState(['']);
  const [addedEquipmentsName, setAddedEquipmentsName] = useState(['']);
  const [osTypes, setOsTypes] = useState<OsTypeData[]>([]);
  const [selectedLocal, setSelectedLocal] = useState('0');
  const [selectedOsType, setSelectedOsType] = useState('0');
  const [selectedEquipment, setSelectedEquipment] = useState('0');
  const [selectedEquipmentName, setSelectedEquipmentName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const response = await api.post('sessions', {
          password,
        });

        localStorage.setItem('loginName', response.data.loginName);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('email', response.data.email);

        history.push('/profile');
      } catch (er) {
        console.log('erro ao logar');
      }
    },
    [password, history],
  );

  useEffect(() => {
    async function loadData() {
      const getLocals = await api.get('local');
      const getOsTypes = await api.get('osTypes');

      setLocals(getLocals.data);
      setOsTypes(getOsTypes.data);
    }

    loadData();
  }, []);

  const handleSelectLocal = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const local = event.target.value;

      setSelectedLocal(local);

      const response = await api.get('equipment/local', {
        headers: {
          localid: local,
        },
      });

      setEquipments(response.data);
    },
    [],
  );

  const handleSelectEquipment = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const equipment = event.target.value;

      const index = event.target.selectedIndex;
      const equipmentName = event.target[index].textContent;

      if (equipmentName) {
        setSelectedEquipmentName(equipmentName);
      }

      setSelectedEquipment(equipment);
    },
    [],
  );

  const handleSelectOsType = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const osType = event.target.value;

      setSelectedOsType(osType);
    },
    [],
  );

  const handleAddEquipment = useCallback(() => {
    if (selectedEquipment !== '0') {
      if (addedEquipments.length === 1) {
        setAddedEquipments([selectedEquipment]);
        setAddedEquipmentsName([selectedEquipmentName]);
      }
      setAddedEquipments([...addedEquipments, selectedEquipment]);
      setAddedEquipmentsName([...addedEquipmentsName, selectedEquipmentName]);
    }
  }, [
    addedEquipments,
    addedEquipmentsName,
    selectedEquipment,
    selectedEquipmentName,
  ]);

  const handleNewOs = useCallback(() => {}, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Criação de ordem de serviço</h1>

            <textarea
              placeholder="Digite a descrição"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <select
              value={selectedOsType}
              onChange={handleSelectOsType}
              name="osType"
              id="osType"
            >
              <option value="0">Tipo</option>

              {osTypes.map(osType => (
                <option key={osType.osTypeId} value={osType.osTypeId}>
                  {osType.typeName}
                </option>
              ))}
            </select>

            <p>
              OBS: Só é possível abrir ordem de serviço para um único local.
            </p>
            <AddEquipmentContainer>
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

              <button type="button" onClick={handleAddEquipment}>
                Adicionar
              </button>
            </AddEquipmentContainer>

            <ul>
              {addedEquipmentsName.map(equipment => (
                <li>{equipment}</li>
              ))}
            </ul>

            <Button onClick={handleNewOs} type="submit">
              Confirmar
            </Button>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
