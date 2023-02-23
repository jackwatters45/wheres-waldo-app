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

const LevelCards = ({ page, className }) => {
  return (
    <Levels className={className}>
      <LevelCard
        to={`/wheres-waldo-app/${page}/rocket`}
        name={'Rocket'}
        img={rocketScene}
        levelId={'rocket'}
      />
      <LevelCard
        to={`/wheres-waldo-app/${page}/un-meeting`}
        name={'UN Meeting'}
        img={unScene}
        levelId={'un-meeting'}
      />
      <LevelCard
        to={`/wheres-waldo-app/${page}/dna`}
        name={'DNA'}
        img={dnaScene}
        levelId={'dna'}
      />
    </Levels>
  );
};

export default LevelCards;
