import React, { useCallback, useEffect, useState } from 'react';

import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

const Header: React.FC = () => {
  const [loginName, setLoginName] = useState('');
  const history = useHistory();

  useEffect(() => {
    const name = localStorage.getItem('name');

    if (name) {
      setLoginName(name);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    history.push('/');
  }, [history]);

  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <ul>
        <li>Home</li>
        <li>Histórico</li>
        <li>Locais</li>
        <li>Equipamentos</li>
        <li>Usuários</li>
        <li>Tipos de O.S</li>
        <li>Estados de O.S</li>
      </ul>
    </Container>
  );
};

export default Header;
