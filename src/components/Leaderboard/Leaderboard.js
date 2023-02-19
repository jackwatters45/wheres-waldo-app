import React from 'react';
import styled from 'styled-components';
import LeaderboardTable from './LeaderboardTable';
import LevelCards from '../utils/LevelCards';
import Title from '../utils/Title';
import { useParams } from 'react-router-dom';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: start;
  align-items: center;
  padding: 25px 0;
`;

const StyledLevelCards = styled(LevelCards)`
  & img {
    height: 250px;
  }
`;

const Leaderboard = () => {
  const { id } = useParams();
  // TODO function to get rocket leaderboard data

  return (
    <LeaderboardContainer>
      <Title />
      <StyledLevelCards id={id} page={'leaderboard'} />
      {/* Eventually gonna need to format below */}
      <LeaderboardTable id={id} />
    </LeaderboardContainer>
  );
};

export default Leaderboard;

// <LeaderboardTable name={'DNA'} scores={testScores} />
// <LeaderboardTable name={'United Nations'} scores={testScores} />

// TODO selected
