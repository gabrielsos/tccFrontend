/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
        <li onClick={() => history.push('/')}>Home</li>
        <li onClick={() => history.push('/admin/historico')}>Histórico</li>
        <li onClick={() => history.push('/admin/locais')}>Locais</li>
        <li onClick={() => history.push('/admin/equipamentos')}>
          Equipamentos
        </li>
        <li onClick={() => history.push('/admin/usuarios')}>Usuários</li>
        <li onClick={() => history.push('/admin/tipo-os')}>Tipos de O.S</li>
        <li onClick={() => history.push('/admin/estado-os')}>Estados de O.S</li>
      </ul>
    </Container>
  );
};

export default Header;
