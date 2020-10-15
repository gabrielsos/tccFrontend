import React, {
  useCallback,
  useState,
  FormEvent,
  useEffect,
  ChangeEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft, FiTrash } from 'react-icons/fi';
import api from '../../services/api';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  AddEquipmentContainer,
  ListEquipmentContainer,
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

interface equip {
  equipmentName: string;
  equipmentSerialNumber: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();

  const [locals, setLocals] = useState<LocalData[]>([]);
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);
  const [addedEquipments, setAddedEquipments] = useState(['']);
  const [addedEquipmentsName, setAddedEquipmentsName] = useState(['']);
  const [addedEquip, setAddedEquip] = useState<equip[]>([]);
  const [osTypes, setOsTypes] = useState<OsTypeData[]>([]);
  const [selectedLocal, setSelectedLocal] = useState('0');
  const [selectedOsType, setSelectedOsType] = useState('0');
  const [selectedEquipment, setSelectedEquipment] = useState('0');
  const [selectedEquipmentName, setSelectedEquipmentName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const loginName = localStorage.getItem('loginName');

      addedEquipments.shift();

      const newAddedEquipment = addedEquipments.filter(
        (current, i) => addedEquipments.indexOf(current) === i,
      );

      if (
        selectedOsType === '0' ||
        description === undefined ||
        newAddedEquipment.length === 0 ||
        loginName === undefined
      ) {
        alert('Preencha todos os campos!');
      } else {
        await api.post('profile/newos', {
          osDescription: description,
          osTypeId: selectedOsType,
          equipmentSerialNumber: newAddedEquipment,
          loginName,
        });

        history.push('/');
      }
    },
    [addedEquipments, description, history, selectedOsType],
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

      setSelectedEquipment('0');
      setAddedEquipments(['']);
      setAddedEquipmentsName(['']);

      setAddedEquip([]);

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
        setSelectedEquipment(equipment);
      }
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
      setAddedEquipments([...addedEquipments, selectedEquipment]);
      setAddedEquipmentsName([...addedEquipmentsName, selectedEquipmentName]);

      const newAddedEquipment = addedEquipments.filter(
        (current, i) => addedEquipments.indexOf(current) === i,
      );

      const newAddedEquipmentName = addedEquipmentsName.filter(
        (current, i) => addedEquipmentsName.indexOf(current) === i,
      );

      newAddedEquipment.shift();
      newAddedEquipmentName.shift();

      console.log(newAddedEquipment.length);
      const teste = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < newAddedEquipment.length; i++) {
        console.log('entrou');
        teste.push({
          equipmentName: newAddedEquipmentName[i],
          equipmentSerialNumber: newAddedEquipment[i],
        });
      }

      setAddedEquip(teste);
    }
  }, [
    addedEquipments,
    addedEquipmentsName,
    selectedEquipment,
    selectedEquipmentName,
  ]);

  const handleDelete = useCallback(
    (id: string, name: string) => {
      const addedEquipFiltered = addedEquip.filter(
        addEquip => addEquip.equipmentSerialNumber !== id,
      );

      const addedEquipNameFiltered = addedEquipmentsName.filter(
        addEquip => addEquip !== name,
      );

      const addedEquipSerialFiltered = addedEquipments.filter(
        addEquip => addEquip !== id,
      );

      setAddedEquip(addedEquipFiltered);
      setAddedEquipmentsName(addedEquipNameFiltered);
      setAddedEquipments(addedEquipSerialFiltered);
    },
    [addedEquip, addedEquipments, addedEquipmentsName],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Criação de ordem de serviço</h1>
            <FiArrowLeft size={24} color="#ff9000" onClick={history.goBack} />
            <textarea
              placeholder="Digite a descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
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

            <h3>OBS: Selecione somente equipamentos de um único local.</h3>
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

            <ListEquipmentContainer>
              <h3>Equipamentos selecionados:</h3>
              <ul>
                {addedEquip?.map(equipment => (
                  <li key={equipment.equipmentSerialNumber}>
                    {equipment.equipmentName}
                    <FiTrash
                      onClick={() =>
                        handleDelete(
                          equipment.equipmentSerialNumber,
                          equipment.equipmentName,
                        )}
                    />
                  </li>
                ))}
              </ul>
            </ListEquipmentContainer>

            <Button type="submit">Confirmar</Button>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
