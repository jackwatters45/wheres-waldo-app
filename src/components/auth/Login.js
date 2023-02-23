import React, { useState } from 'react';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useFormInput from '../utils/useFormInput';
import Icon from '@mdi/react';
import { mdiEyeLockOpen, mdiEyeLock, mdiGoogle, mdiGithub } from '@mdi/js';

const Page = styled.div`
  height: 100vh;
  margin: 0 auto;
`;

const Container = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: fit-content;
  padding: 2rem;
  margin: 3rem auto;
  background-color: var(--card-background-color);
  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  text-decoration: none;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;
`;

const FormHeader = styled.h1`
  font-size: 36px;
`;

const PopupSignIns = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 10px;
  justify-content: center;
`;

const StyledButton = styled.button`
  color: var(--main-font-color);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  background-color: var(--section-background-color);
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  &:hover {
    background-color: var(--main-background-color);
  }
`;

const StyledPopupIcon = styled(Icon)`
  margin: auto;
`;

const FormRow = styled.div`
  font-size: 20px;
  padding: 1.2rem 0px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  align-items: center;
`;

const StyledLabel = styled.label`
font-size: 22px`

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
  margin: 10px 0 0 260px;
  cursor: pointer;
`;

const SubmitButton = styled.input`
  margin-top: 1rem;
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
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const Login = () => {
  const navigate = useNavigate();
  auth.useDeviceLanguage();

  const [email, handleEmailChange] = useFormInput();
  const [password, handlePasswordChange] = useFormInput();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const loginEmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      navigate('/');
    } catch (e) {
      // TODO -> Error text
    }
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch {
      // TODO
    }
  };

  const loginGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch {
      // TODO
    }
  };

  return (
    <Page>
      <Container>
        <Header>
          <FormHeader>Log in</FormHeader>

          <PopupSignIns>
            <StyledButton onClick={loginGoogle}>
              <StyledPopupIcon path={mdiGoogle} size={1} />
            </StyledButton>
            <StyledButton onClick={loginGithub}>
              <StyledPopupIcon path={mdiGithub} size={1} />
            </StyledButton>
          </PopupSignIns>
        </Header>
        <StyledForm onSubmit={loginEmail}>
          <FormRow>
            <StyledLabel htmlFor="email">Email:</StyledLabel>
            <StyledInput
              required={true}
              name="email"
              type="email"
              value={email.value}
              onChange={handleEmailChange}
            />
          </FormRow>
          <FormRow>
            <StyledLabel htmlFor="password">Password:</StyledLabel>
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
          <SubmitButton type="submit" value={'Log in'} />
          <LoginLinkDiv>
            Don't have an account?{' '}
            <StyledLink to={'/create-account'}>Create an account.</StyledLink>
          </LoginLinkDiv>
          {/* TODO error text */}
        </StyledForm>
      </Container>
    </Page>
  );
};

export default Login;
