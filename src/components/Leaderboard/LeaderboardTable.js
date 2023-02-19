import React from 'react';
import styled from 'styled-components';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: var(--card-background-color);
  border: 1px solid var(--section-background-color);
  padding: 10px;
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  grid-column: 1/2;
  margin: 10px 0 0 0;
  width: 800px;
`;

const LeaderboardColumnHeaders = styled(LeaderboardRow)`
  background-color: var(--card-hover-background-color);
  border-radius: 4px;
  & > p {
    font-weight: 700;
  }
`;

const LeaderboardTable = ({id}) => {
  const leaderboardData = testScores.find((level) => level.level === id)
  return (
    <LeaderboardContainer>
      <LeaderboardColumnHeaders
        class={'header'}
        rank={'Rank'}
        name={'Name'}
        time={'Time (s)'}
        date={'Date'}
      />
      {leaderboardData.scores.map(({ rank, name, time, date }) => (
        <LeaderboardRow
          key={rank}
          rank={rank}
          name={name}
          time={time}
          date={date}
        />
      ))}
    </LeaderboardContainer>
  );
};

export default LeaderboardTable;

const testScores = [
  {
    level: 'rocket',
    scores: [
      { rank: 1, name: 'Wolverine', time: 6.51, date: new Date() },
      { rank: 2, name: 'Dr. Hank McCoy', time: 8.48, date: new Date() },
      { rank: 3, name: 'Professor X', time: 11.65, date: new Date() },
      { rank: 4, name: 'Raven', time: 15.42, date: new Date() },
    ],
  },
  {
    level: 'dna',
    scores: [
      { rank: 1, name: 'Home', time: 6.51, date: new Date() },
      { rank: 2, name: 'Lisa', time: 8.48, date: new Date() },
      { rank: 3, name: 'Bart', time: 11.65, date: new Date() },
      { rank: 4, name: 'Marge', time: 15.42, date: new Date() },
    ],
  },
  {
    level: 'un-meeting',
    scores: [
      { rank: 1, name: 'Charlie', time: 6.51, date: new Date() },
      { rank: 2, name: 'Frank', time: 8.48, date: new Date() },
      { rank: 3, name: 'Dee', time: 11.65, date: new Date() },
      { rank: 4, name: 'Mac', time: 15.42, date: new Date() },
    ],
  },
];
