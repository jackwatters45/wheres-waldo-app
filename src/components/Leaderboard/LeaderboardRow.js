import React from 'react';
import styled from 'styled-components';

const LeaderboardColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr;
`;

const Column = styled.p`
  font-size: 22px;
  padding: 0 5px;
`;

const LeaderboardRow = ({ className, rank, name, time, date }) => {
  const formatDate = () => {
    if (typeof date === 'string') return date;
    return new Date(date).toLocaleDateString();
  };

  return (
    <LeaderboardColumns className={className}>
      <Column>{rank}</Column>
      <Column>{name}</Column>
      <Column>{formatDate()}</Column>
      <Column>{time}</Column>
    </LeaderboardColumns>
  );
};
export default LeaderboardRow;

//  TODO max name length
