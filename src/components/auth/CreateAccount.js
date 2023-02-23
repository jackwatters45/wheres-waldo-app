import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useFormInput from '../utils/useFormInput';
import Icon from '@mdi/react';
import { mdiEyeLockOpen, mdiEyeLock } from '@mdi/js';

const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
`;

const FormContainer = styled.form`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: fit-content;
  padding: 2rem;
  margin: 3rem auto;
  background-color: var(--card-background-color);
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  text-decoration: none;
`;

const FormHeader = styled.h1`
  font-size: 36px;
`;

const FormRow = styled.div`
  font-size: 20px;
  padding: 1.5rem 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  align-items: center;
`;

const StyledHr = styled.hr`
  background-color: var(--main-font-color);
  border: none;
  height: 1px;
`;

const FirstFormRow = styled(FormRow)`
  margin-top: 1rem;
`;

const StyledInput = styled.input`
  background-color: transparent;
  width: 100%;
  border: inherit;
  outline: none;
  display: flex;
  font-size: inherit;
  color: var(--main-font-color);
  border-bottom: 1px solid var(--secondary-font-color);
  background-color: rgba(255, 255, 255, 0.055);
  border-radius: 4px;
  height: 40px;
  padding: 8px 10px 5px 10px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  &:hover {
    background-color: var(--card-hover-background-color);
  }
  &:invalid {
    border-bottom: 2px solid #7f1d1d;
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  color: var(--empty-font-color);
  margin: 10px 0 0 240px;
  cursor: pointer;
`;

const SubmitButton = styled.input`
  color: var(--main-font-color);
  font-size: 24px;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  height: 3rem;
  background-color: var(--section-background-color);
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  &:hover {
    background-color: var(--main-background-color);
  }
`;

const LoginLinkDiv = styled.div`
  margin: 10px 0 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const ErrorDiv = styled.div`
  height: 18px;
  margin: 0 0 10px 0;
  display: flex;
  justify-content: center;
`;

const Error = styled.p`
  background-color: #7f1d1d;
  border-radius: 4px;
  font-size: 12px;
  padding: 0px 4px;
  width: fit-content;
`;

const CreateAccount = () => {
  const navigate = useNavigate();
  auth.useDeviceLanguage();

  const [username, handleUsernameChange] = useFormInput();
  const [email, handleEmailChange] = useFormInput();
  const [password, handlePasswordChange] = useFormInput();
  const [confirmPassword, handleConfirmPasswordChange] = useFormInput();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [errorMessage, setErrorMessage] = useState('');
  const createAccount = async (e) => {
    e.preventDefault();
    if (
      !username.validity ||
      !email.validity ||
      !password.validity ||
      !confirmPassword.validity
    )
      return;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value,
      );
      await updateProfile(user, { displayName: username.value });
      navigate('/wheres-waldo-app/');
    } catch (e) {
      if (e.message.includes('auth/email-already-in-use'))
        setErrorMessage(
          'This is already associated with an account. Please try logging in instead.',
        );
      setErrorMessage('There was an error creating an account.');
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={createAccount}>
        <FormHeader>Create an Account</FormHeader>
        <StyledHr />
        <FirstFormRow>
          <label htmlFor="username">Username:</label>
          <StyledInput
            autoFocus
            required={true}
            maxLength={20}
            name="username"
            value={username.value}
            onChange={handleUsernameChange}
          />
        </FirstFormRow>
        <FormRow>
          <label htmlFor="email">Email:</label>
          <StyledInput
            required={true}
            name="email"
            type="email"
            value={email.value}
            onChange={handleEmailChange}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="password">Password:</label>
          <div>
            <StyledIcon
              path={showPassword ? mdiEyeLock : mdiEyeLockOpen}
              size={0.8}
              onClick={toggleShowPassword}
            />
            <StyledInput
              required={true}
              minLength={8}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password.value}
              onChange={handlePasswordChange}
            />
          </div>
        </FormRow>
        <FormRow>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <div>
            <StyledIcon
              path={showPassword ? mdiEyeLock : mdiEyeLockOpen}
              size={0.8}
              onClick={toggleShowPassword}
            />
            <StyledInput
              required={true}
              type={showPassword ? 'text' : 'password'}
              pattern={password.value}
              name="confirm-password"
              value={confirmPassword.value}
              onChange={handleConfirmPasswordChange}
            />
          </div>
        </FormRow>
        <ErrorDiv>{errorMessage ? <Error>{errorMessage}</Error> : ''}</ErrorDiv>
        <SubmitButton type="submit" value={'Create Account'} />
        <LoginLinkDiv>
          Already have an account?{' '}
          <StyledLink to={'/wheres-waldo-app/login'}>Log in.</StyledLink>
        </LoginLinkDiv>
      </FormContainer>
    </Container>
  );
};

export default CreateAccount;
