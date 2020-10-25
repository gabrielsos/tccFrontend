import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface LocalData {
  localId: number;
  localName: string;
}

const NewEquipment: React.FC = () => {
  const history = useHistory();

  const [equipmentName, setequipmentName] = useState('');
  const [equipmentSerialNumber, setEquipmentSerialNumber] = useState('');
  const [selectedLocal, setSelectedLocal] = useState('0');
  const [locals, setLocals] = useState<LocalData[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('local');

      setLocals(response.data);
    }

    loadData();
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (
        equipmentName !== '' ||
        equipmentSerialNumber !== '' ||
        selectedLocal !== '0'
      ) {
        try {
          await api.post('equipment/new', {
            equipmentName,
            equipmentSerialNumber,
            localId: selectedLocal,
          });

          history.goBack();
        } catch (err) {
          alert('Número de série já cadastrado.');
        }
      } else {
        alert('Preencha todos os campos.');
      }
    },
    [equipmentName, equipmentSerialNumber, history, selectedLocal],
  );

  const handleSelectLocal = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const osType = event.target.value;

      setSelectedLocal(osType);
    },
    [],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Criação de equipamento</h1>
            <FiArrowLeft size={24} color="#ff9000" onClick={history.goBack} />

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

            <input
              placeholder="Digite o nome"
              value={equipmentName}
              onChange={e => setequipmentName(e.target.value)}
            />

            <input
              placeholder="Digite o número de série"
              value={equipmentSerialNumber}
              onChange={e => setEquipmentSerialNumber(e.target.value)}
            />

            <Button type="submit">Confirmar</Button>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default NewEquipment;
