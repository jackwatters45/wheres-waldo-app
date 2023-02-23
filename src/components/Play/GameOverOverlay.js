import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import BadWordsFilter from 'bad-words';
import { UserContext } from '../../App';
import SubmitScoreForm from './SubmitScoreForm';

const OverlayContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 2;
`;

const OverlayContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 600px;
  height: auto;
  background-color: var(--main-background-color);
  border-radius: 12px;
  padding: 50px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;

  display: flex;
  flex-direction: column;
`;

const Score = styled.h3`
  font-size: 32px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 50px 0 0 0;
`;

const StyledButton = styled.button`
  padding: 15px;
  border-radius: 4px;
  width: 200px;
  border: none;
  color: var(--main-font-color);
  height: 50px;
  font-size: 20px;
  box-shadow: rgb(255 255 255 / 20%) 0px 0px 0px 1px,
    rgb(255 255 255 / 20%) 0 2px 4px;
`;

const HomeButton = styled(StyledButton)`
  background-color: #2563eb;
  &:hover {
    background-color: #3b82f6;
  }
`;

const PlayAgainButton = styled(StyledButton)`
  justify-self: flex-end;
  background-color: #dc2626;
  &:hover {
    background-color: #ef4444;
  }
`;

const ButtonLink = styled(Link)`
  height: fit-content;
`;

const UnderlinedLink = styled(Link)`
  text-decoration: underline;
`;

const SubmittedText = styled.h4`
  margin: 2rem 0 0 0;
  font-size: 16px;
`;

const GameOverOverlay = ({ time, id, handleResetGame }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) submitScore(user.email);
  });

  const submitScore = async (userName) => {
    const filter = new BadWordsFilter();
    const cleanUsername = filter.clean(userName);
    try {
      await addDoc(collection(db, `${id}-scores`), {
        time: parseFloat(time),
        name: cleanUsername,
        date: new Date(),
        user: user ? user.uid : null,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <OverlayContainer>
      <OverlayContentContainer>
        <Score>You finished in {time.toFixed(2)} seconds.</Score>
        {user ? (
          <SubmittedText>
            Your score has been successfully submitted. Check the{' '}
            <UnderlinedLink to={`/wheres-waldo-app/leaderboard/${id}`}>
              Leaderboard
            </UnderlinedLink>{' '}
            to see where you rank!
          </SubmittedText>
        ) : (
          <SubmitScoreForm id={id} time={time} submitScore={submitScore} />
        )}
        <ButtonContainer>
          <ButtonLink to={'/wheres-waldo-app/'}>
            <HomeButton>Home</HomeButton>
          </ButtonLink>
          <PlayAgainButton onClick={handleResetGame}>
            Play Again
          </PlayAgainButton>
        </ButtonContainer>
      </OverlayContentContainer>
    </OverlayContainer>
  );
};

export default GameOverOverlay;
