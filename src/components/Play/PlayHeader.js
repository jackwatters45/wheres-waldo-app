import React from 'react';
import Title from '../utils/Title';
import styled from 'styled-components';
import PlayDropdown from './PlayDropdown';
import Timer from './Timer';

const PlayHeaderContainer = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: fit-content;
  padding: 10px 50px;
  align-items: center;
  background-color: var(--main-background-color);
width: 100%;
`;

const PlayHeader = ({ chars }) => {
  return (
    <PlayHeaderContainer>
      <Title />
      <PlayDropdown chars={chars} />
      <Timer />
    </PlayHeaderContainer>
  );
};

export default PlayHeader;
