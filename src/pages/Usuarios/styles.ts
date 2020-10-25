import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;

  svg {
    cursor: pointer;
  }
`;

export const AsideContainer = styled.div`
  h1 {
    margin-bottom: 10px;
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

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 10px 0;

  h1 {
    font-size: 14px;
    color: #fff;
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

  ul > h1 {
    color: #fff;
    margin-bottom: 10px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
