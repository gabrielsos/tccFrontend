import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff0000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  padding: 0 16px;
  width: 30%;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff0000')};
    cursor: not-allowed;
  }

  h1 {
    font-size: 20px;
  }
`;
