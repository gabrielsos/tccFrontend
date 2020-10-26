import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;

  li:nth-child(2) {
    color: #ff9000;
  }

  svg {
    cursor: pointer;
  }
`;

export const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  margin: 20px 0 20px 0;
  width: 100%;
  height: 100%;
  align-items: center;
  background: #4f4f4f;
  padding: 20px;
  color: #000;

  span {
    color: #fff !important;
  }

  svg {
    cursor: pointer;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  h1 {
    color: #fff;
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
  margin-bottom: 10px;

  h1 {
    color: #fff;
    font-size: 18px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: stretch;
  margin: 10px 0 10px 0;

  select {
    width: 20%;
    border-radius: 10px;
    margin-right: 20px;
  }

  button {
    width: 20%;
    margin-right: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background: #1c1c1c;
  align-items: center;
  padding: 0 200px 0 200px;
  justify-content: space-between;

  h1 {
    font-size: 15px;
    color: #ff9000;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  align-self: center;
  width: 70%;

  a {
    text-decoration: none;
  }

  ul {
    width: 100%;
    list-style: none;
  }

  li {
    cursor: pointer;
    width: 100%;
    background: #4f4f4f;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;

    strong {
      color: #ff9000;
    }

    p {
      padding: 5px 0 5px 0;
      color: #fff;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;

  svg {
    margin-left: 20px;
  }
`;

export const NameContainer = styled.div``;
