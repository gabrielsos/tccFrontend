import React, {
  useCallback,
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface osStateData {
  osStateId: number;
  osStateName: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();

  const [description, setDescription] = useState('');
  const [osStates, setOsStates] = useState<osStateData[]>([]);
  const [selectedOsState, setSelectedOsState] = useState('0');

  useEffect(() => {
    async function loadOsStates() {
      const response = await api.get('osStates');

      console.log(response.data);
      setOsStates(response.data);
    }

    loadOsStates();
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const loginName = localStorage.getItem('loginName');
      const osId = localStorage.getItem('osIdRegister');
      const osDateInit = localStorage.getItem('osDateInit');

      if (description === undefined || selectedOsState === '0') {
        alert('Preencha todos os campos!');
      } else {
        await api.post('os/register/new', {
          osRegisterDescription: description,
          osDateInit,
          osId,
          selectedOsState,
          loginName,
        });

        history.push(`/admin/os/${osId}`);
      }
    },
    [description, history, selectedOsState],
  );

  const handleSelectOsState = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const osState = event.target.value;

      setSelectedOsState(osState);
    },
    [],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Novo registro</h1>
            <FiArrowLeft size={24} color="#ff9000" onClick={history.goBack} />
            <textarea
              placeholder="Digite o registro"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <select
              value={selectedOsState}
              onChange={handleSelectOsState}
              name="osType"
              id="osType"
            >
              <option value="0">Estado da o.s</option>

              {osStates.map(osState => (
                <option key={osState.osStateId} value={osState.osStateId}>
                  {osState.osStateName}
                </option>
              ))}
            </select>

            <Button type="submit">Confirmar</Button>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
