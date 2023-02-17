import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  padding: 50px;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const LeaderBoard = styled(Link)`
  grid-column: 2;
  justify-self: flex-end;
  align-self: center;
  font-size: 24px;
  font-weight: 700;
`;

const Nav = () => (
  <StyledNav>
    <Link to="/">
      <Title>Where's Waldo</Title>
    </Link>
    <LeaderBoard to="/leaderboard">Leaderboard</LeaderBoard>
  </StyledNav>
);

export default Nav;
