import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

const UpdateOsType: React.FC = () => {
  const history = useHistory();

  const [typeName, setTypeName] = useState('');
  const [osTypeId, setOsTypeId] = useState('');

  useEffect(() => {
    const getTypeName = localStorage.getItem('typeName');
    const getOsTypeId = localStorage.getItem('osTypeId');

    if (getTypeName && getOsTypeId) {
      setOsTypeId(getOsTypeId);
      setTypeName(getTypeName);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (typeName !== '') {
        try {
          await api.put('ostype', {
            typeName,
            osTypeId,
          });

          history.goBack();
        } catch (err) {
          alert('Não foi possível criar um local.');
        }
      } else {
        alert('Preencha todos os campos.');
      }
    },
    [history, osTypeId, typeName],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <h1>Atualização de tipo de ordem de serviço</h1>
            <FiArrowLeft size={24} color="#ff9000" onClick={history.goBack} />
            <input
              placeholder="Digite o nome"
              value={typeName}
              onChange={e => setTypeName(e.target.value)}
            />

            <Button type="submit">Confirmar</Button>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default UpdateOsType;
