import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import useHighScore from './useUserHighScore';

const StyledLink = styled(Link)`
  height: fit-content;
`;

const PreviewCard = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: var(--card-background-color);
  padding: 20px 20px 10px 20px;
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  &:hover {
    opacity: 0.8;
  }
`;

const PreviewImage = styled.img`
  align-self: center;
`;

const LevelName = styled.h3`
  font-size: 20px;
`;

const HighScoreContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const LevelCard = ({ name, img, to, levelId }) => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [highScore, fetchHighScore] = useHighScore();
  useEffect(() => {
    fetchHighScore(levelId, user);
  });

  const [selected, setSelected] = useState();
  useEffect(() => {
    setSelected(
      id === levelId
        ? 'var(--empty-font-color)'
        : 'var(--card-background-color)',
    );
  }, [id, levelId]);

  return (
    <StyledLink to={to}>
      <PreviewCard style={{ backgroundColor: selected }}>
        <PreviewImage src={img} alt="Scene Preview" />
        <LevelName>{name}</LevelName>
        {highScore && (
          <HighScoreContainer>
            <p>High Score</p>
            <p>{highScore.toFixed(2)}s</p>
          </HighScoreContainer>
        )}
      </PreviewCard>
    </StyledLink>
  );
};

export default LevelCard;
