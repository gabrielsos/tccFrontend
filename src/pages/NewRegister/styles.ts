import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #363636;

  select {
    margin-bottom: 10px;
    border-radius: 10px;
    background: #fff;
    color: #ff9000;
    height: 30px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  place-content: center;

  width: 50%;
  height: 100%;
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

  h3 {
    align-self: flex-start;
    color: #ff9000;
    margin: 10px 0 10px 0;
  }

  animation: ${apperFromLeft} 1s;

  ul {
    list-style: none;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 80px 0;
    width: 70%;
    height: 100%;
    text-align: center;

    svg {
      cursor: pointer;
      align-self: flex-start;
    }
  }

  input {
    margin-bottom: 10px;
  }

  h1 {
    margin: 10px 0 24px 0;
    color: #fff;
  }

  textarea {
    width: 80%;
    resize: none;
    margin: 10px 0 10px 0;

    ::placeholder {
      color: #ff9000;
    }
  }

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#F4EDE8')};
    }
  }
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;
