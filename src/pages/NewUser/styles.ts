import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #363636;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  place-content: center;

  width: 50%;
  max-width: 700px;
`;

const apperFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  animation: ${apperFromLeft} 1s;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 80px 0;
    width: 70%;
    height: 100%;
    text-align: center;
  }

  select {
    width: 100%;
    margin: 20px 0 20px 0;
    border-radius: 10px;
    background: #fff;
    color: #3b3b3b;
    height: 70px;
    font-size: 20px;
  }

  svg {
    cursor: pointer;
  }

  input {
    margin-bottom: 20px;
  }

  h1 {
    margin: 10px 0 24px 0;
    color: #fff;
  }
`;
