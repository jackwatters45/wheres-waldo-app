import React from 'react';
import styled from 'styled-components';

const PreviewCard = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  background-color: var(--card-background-color);
  padding: 20px 20px 10px 20px;
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
`;

const PreviewImage = styled.img`
  height: 320px;
  margin-bottom: 10px;
`;

const LevelName = styled.h3`
  font-size: 20px;
`;

const HighScoreContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const LevelCard = ({ name, img, highScore }) => (
  <PreviewCard>
    <PreviewImage src={img} alt="Scene Preview" />
    <LevelName>{name} Level</LevelName>
    <HighScoreContainer>
      <p>High Score</p>
      <p>{highScore}s</p>
    </HighScoreContainer>
  </PreviewCard>
);

export default LevelCard;
