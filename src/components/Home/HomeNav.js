import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../utils/Title';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { UserContext } from '../../App';

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
  grid-template-rows: auto auto;
  padding: 50px;
`;

const LoginContainer = styled.div`
  grid-column: 2;
  justify-self: flex-end;
  display: flex;
  gap: 5px;
  font-size: 16px;
`;

const LoginText = styled.h3`
  font-weight: 300;
  font-size: 16px;
`;

const StyledLoginLink = styled(Link)`
  text-decoration: underline;
`;

const LogOutButton = styled.button`
  font: inherit;
  font-weight: 300;
  text-decoration: underline;
  background-color: transparent;
  border: inherit;
  color: var(--main-font-color);
`;

const HomeNav = () => {
  const { user } = useContext(UserContext);
  const signOutUser = async () => await signOut(auth);

  return (
    <StyledNav>
      <Title />
      <LeaderBoard to="/leaderboard/rocket">Leaderboard</LeaderBoard>
      {user ? (
        <LoginContainer>
          <LoginText>Welcome, {user.displayName || user.email} - </LoginText>
          <LogOutButton onClick={signOutUser}>Sign Out</LogOutButton>
        </LoginContainer>
      ) : (
        <LoginContainer>
          <StyledLoginLink to={'/wheres-waldo-app/login'}>Login</StyledLoginLink>
          <LoginText>to view/save your high scores</LoginText>
        </LoginContainer>
      )}
    </StyledNav>
  );
};
export default HomeNav;
