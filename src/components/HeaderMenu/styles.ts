import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #1c1c1c;
  align-items: center;
  padding: 0 230px 0 210px;
  justify-content: space-between;

  ul {
    display: flex;
    width: 100%;
    height: 100%;
    list-style: none;
    margin-bottom: 10px;

    align-items: center;
    justify-content: space-between;
  }

  li:hover {
    color: #ff9000;
  }

  li {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 70px;
    color: #fff;
    margin-right: 10px;
  }

  h1 {
    font-size: 15px;
    color: #ff9000;
  }

  svg {
    cursor: pointer;
  }
`;
