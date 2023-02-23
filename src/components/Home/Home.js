import React from 'react';
import LevelCards from '../utils/LevelCards';
import styled from 'styled-components';
import HomeNav from './HomeNav';
import Footer from '../utils/Footer';

const HomeContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const StyledLevelCards = styled(LevelCards)`
  & img {
    height: 320px;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeNav />
      <StyledLevelCards page={'play'}  />
      <Footer />
    </HomeContainer>
  );
};

export default Home;
