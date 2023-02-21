import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../utils/Title';

const LeaderBoard = styled(Link)`
  grid-column: 2;
  justify-self: flex-end;
  align-self: center;
  font-size: 24px;
  font-weight: 700;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 50px;
`;

const HomeNav = () => (
  <StyledNav>
    <Title />
    <LeaderBoard to="/leaderboard/rocket">Leaderboard</LeaderBoard>
  </StyledNav>
);

export default HomeNav;
