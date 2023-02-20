import React from 'react';
import styled from 'styled-components';
import LevelCard from './LevelCard';
import rocketScene from '../../assets/waldoScenes/rocket.jpg';
import unScene from '../../assets/waldoScenes/un-meeting.jpg';
import dnaScene from '../../assets/waldoScenes/dna.jpg';

const Levels = styled.div`
  justify-content: center;
  display: flex;
  gap: 40px;
  padding: 25px 0;
`;

const LevelCards = ({ id, page, className }) => {
  return (
    <Levels className={className}>
      <LevelCard
        to={`/${page}/rocket`}
        name={'Rocket'}
        img={rocketScene}
        highScore={11.3}
        id={id}
      />
      <LevelCard
        to={`/${page}/un-meeting`}
        name={'UN Meeting'}
        img={unScene}
        highScore={12.7}
        id={id}
      />
      <LevelCard
        to={`/${page}/dna`}
        name={'DNA'}
        img={dnaScene}
        highScore={18.4}
        id={id}
      />
    </Levels>
  );
};

export default LevelCards;
