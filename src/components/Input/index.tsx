import React, { InputHTMLAttributes } from 'react';

import { FiSearch } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons/lib';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, placeholder }) => {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input name={name} placeholder={placeholder} />
    </Container>
  );
};

export default Input;
