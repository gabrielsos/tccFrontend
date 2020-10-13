import styled from 'styled-components';

export const Container = styled.div`
  background: #ededed;
  border-radius: 40px;
  padding: 10px;
  width: 40%;
  color: #000000;
  margin-top: 20px;

  display: flex;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;

    &::placeholder {
      color: #000000;
    }

    & + input {
      margin-top: 8px;
    }
  }

  svg {
    margin-left: 15px;
    margin-right: 16px;
  }
`;
