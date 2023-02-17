import React from 'react';
import LevelCard from './LevelCard';
import rocketScene from '../assets/waldoScenes/rocketScene.jpg';
import unScene from '../assets/waldoScenes/unScene.jpg';
import dnaScene from '../assets/waldoScenes/dnaScene.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Levels = styled.div`
  justify-self: center;
  display: flex;
  gap: 25px;
`;

const StyledLink = styled(Link)`
  height: fit-content;
`;

const Home = (props) => {
  return (
    <Levels>
      <StyledLink to="/play/rocket">
        <LevelCard name={'Rocket'} img={rocketScene} highScore={11.3} />
      </StyledLink>
      <StyledLink to="/play/united-nations">
        <LevelCard name={'United Nations'} img={unScene} highScore={12.7} />
      </StyledLink>
      <StyledLink to="/play/dna">
        <LevelCard name={'DNA'} img={dnaScene} highScore={18.4} />
      </StyledLink>
    </Levels>
  );
};

export default Home;
