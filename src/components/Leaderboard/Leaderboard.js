import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import LeaderboardRow from './LeaderboardRow';
import LevelCards from '../utils/LevelCards';
import Title from '../utils/Title';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Pagination from '../utils/Pagination';
import { UserContext } from '../../App';

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

const LeaderboardTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: var(--card-background-color);
  padding: 10px;
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  grid-column: 1/2;
  width: 800px;
`;

const LeaderboardColumnHeaders = styled(LeaderboardRow)`
  background-color: var(--secondary-font-color);
  border-radius: 4px;
  & > p {
    font-weight: 700;
  }
`;

const UserHighScore = styled(LeaderboardRow)`
  background-color: var(--card-hover-background-color);
  border-radius: 4px;
`;

const Leaderboard = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [highScore, setHighScore] = useState();
  const [scores, setScores] = useState([]);
  useEffect(() => {
    if (!user) return;
    const fetchScores = async () => {
      const collectionRef = collection(db, `${id}-scores`);
      const docsSnapshot = await getDocs(collectionRef);

      const scoresArr = [];
      docsSnapshot.forEach((doc) => {
        const date = new Date(doc.get('date').seconds * 1000);
        const time = doc.get('time');
        const name = doc.get('name');
        const user = doc.get('user');
        scoresArr.push({ date, time, name, user });
      });

      scoresArr.sort((a, b) => a.time - b.time);
      scoresArr.forEach((score, index) => (score.rank = index + 1));
      setScores(scoresArr);

      setHighScore(scoresArr.find((score) => score.user === user.uid) || '');
    };
    fetchScores();
  }, [id, user]);

  const [page, setPage] = useState(1);
  const [displayedScores, setDisplayedCourse] = useState();
  const onPageChange = (newPage) => setPage(newPage);
  useEffect(() => {
    const getCurrentPage = () => {
      const start = (page - 1) * 10;
      const end = page * 10;
      setDisplayedCourse(scores.slice(start, end));
    };
    getCurrentPage();
  }, [page, scores]);

  return (
    <LeaderboardContainer>
      <Title />
      <StyledLevelCards id={id} page={'leaderboard'} />
      <LeaderboardTableContainer>
        <LeaderboardColumnHeaders
          class={'header'}
          rank={'Rank'}
          name={'Name'}
          time={'Time (s)'}
          date={'Date'}
        />
        {highScore && 'rank' in highScore && (
          <UserHighScore
            key={highScore.rank}
            rank={highScore.rank}
            name={highScore.name}
            time={highScore.time.toFixed(2)}
            date={highScore.date}
          />
        )}
        {displayedScores &&
          displayedScores.map(({ rank, name, time, date }) => (
            <LeaderboardRow
              key={rank}
              rank={rank}
              name={name}
              time={time.toFixed(2)}
              date={date}
            />
          ))}
      </LeaderboardTableContainer>
      <Pagination
        totalCount={scores.length}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </LeaderboardContainer>
  );
};

export default Leaderboard;
