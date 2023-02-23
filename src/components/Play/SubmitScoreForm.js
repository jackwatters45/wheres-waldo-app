import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormText = styled.p`
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

const StyledLoginLink = styled(Link)`
  text-decoration: underline;
`;

const SubmitScoreForm = ({ submitScore }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [userName, setUserName] = useState('');
  const handleChange = (e) => setUserName(e.target.value);
  const handleSubmitScore = (e) => {
    e.preventDefault();
    submitScore(userName);
    setIsSubmitted(true);
  };

  return (
    <>
      <FormText>Submit your score on the global leaderboard!</FormText>
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
          see if you rank!{' '}
          <StyledLoginLink to={'/wheres-waldo-app/login'}>Log in</StyledLoginLink> to view/save
          your high scores
        </SubmittedText>
      )}
    </>
  );
};

export default SubmitScoreForm;
