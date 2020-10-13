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
      <h1>Bem-vindo(a), {loginName}</h1>
      <FiPower size={24} color="#ff9000" onClick={handleLogout} />
    </Container>
  );
};

export default Header;
