import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

const UpdateLocal: React.FC = () => {
  const history = useHistory();

  const [localName, setLocalName] = useState('');
  const [localId, setLocalId] = useState('');

  useEffect(() => {
    const getLocalId = localStorage.getItem('localId');
    const getLlocalName = localStorage.getItem('localName');

    if (getLocalId && getLlocalName) {
      setLocalName(getLlocalName);
      setLocalId(getLocalId);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (localName !== '') {
        try {
          await api.put('local', {
            localName,
            localId,
          });

          history.goBack();
        } catch (err) {
          alert('Não foi possível criar um local.');
        }
      } else {
        alert('Preencha todos os campos.');
      }
    },
    [history, localId, localName],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Atualização de local</h1>
            <FiArrowLeft size={24} color="#ff9000" onClick={history.goBack} />
            <input
              placeholder="Digite o nome do local"
              value={localName}
              defaultValue={localName}
              onChange={e => setLocalName(e.target.value)}
            />

            <Button type="submit">Confirmar</Button>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default UpdateLocal;
