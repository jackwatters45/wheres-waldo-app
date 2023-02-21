import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import BadWordsFilter from 'bad-words';

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

const SubmitPrompt = styled.p`
  font-size: 16px;
`;

const SubmittedText = styled.h4`
  margin: 2rem 0 0 0;
  font-size: 16px;
`;

const UsernameForm = styled.form`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 3fr 1fr;
  margin: 2rem 0 0 0;
`;

const UsernameLabel = styled.label`
  margin: 8px;
  height: 20px;
`;

const UsernameInput = styled.input`
  background-color: transparent;
  border: solid var(--main-font-color);
  border-radius: 4px 0 0 4px;
  color: var(--main-font-color);
  font-size: 18px;
  padding: 0 8px;
  grid-row: 2;
  height: 40px;
  outline: none:
`;

const UsernameSubmit = styled.button`
  grid-row: 2;
  font-size: 22px;
  border: solid var(--main-font-color);
  border-radius: 0 4px 4px 0;
  background-color: transparent;
  height: 40px;
  color: var(--main-font-color);
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

const StyledLink = styled(Link)`
  height: fit-content;
`;

const GameOverOverlay = ({ time, id, handleResetGame }) => {
  // TODO if signed in stuff
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [userName, setUserName] = useState('');
  const handleChange = (e) => setUserName(e.target.value);
  const handleSubmitScore = async (e) => {
    e.preventDefault();

    const filter = new BadWordsFilter();
    const cleanUsername = filter.clean(userName);
    try {
      const docRef = await addDoc(collection(db, `${id}-scores`), {
        time: parseFloat(time),
        name: cleanUsername,
        date: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      setIsSubmitted(true);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

  };

  return (
    <OverlayContainer>
      <OverlayContentContainer>
        <Score>You finished in {time} seconds.</Score>
        <SubmitPrompt>
          Submit your score on the global leaderboard!
        </SubmitPrompt>
        {!isSubmitted ? (
          <UsernameForm onSubmit={handleSubmitScore}>
            <UsernameLabel htmlFor="username">Username</UsernameLabel>
            <UsernameInput
              autoFocus={true}
              name="username"
              required={true}
              minLength={2}
              maxLength={20}
              value={userName}
              onChange={handleChange}
            />
            <UsernameSubmit type="submit">Submit</UsernameSubmit>
          </UsernameForm>
        ) : (
          <SubmittedText>
            You have successfully submitted your score. Check the leaderboard to
            see where you rank!
          </SubmittedText>
        )}
        <ButtonContainer>
          <StyledLink to={'/'}>
            <HomeButton>Home</HomeButton>
          </StyledLink>
          <PlayAgainButton onClick={handleResetGame}>
            Play Again
          </PlayAgainButton>
        </ButtonContainer>
      </OverlayContentContainer>
    </OverlayContainer>
  );
};

export default GameOverOverlay;
