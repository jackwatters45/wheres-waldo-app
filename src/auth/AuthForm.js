import React from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GithubAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase';
const AuthForm = () => {
  auth.useDeviceLanguage();

  const email = 'jack.watters@me.com';
  const password = 'password';
  // const emailAuth = () => {
  const logInUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      // TODO -> Error text
    }
  };
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      // TODO -> Error text
    }
  };

  const googleAuth = () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope(
      'https://www.googleapis.com/auth/contacts.readonly',
    );

    signInWithRedirect(auth, googleProvider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    // signInWithPopup(auth, googleProvider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };

  const githubAuth = () => {
    const githubProvider = new GithubAuthProvider();
    const signInPopup = () => {
      signInWithPopup(auth, githubProvider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
        });
    };
    const signInWithRedirect = () => {
      signInWithRedirect(auth, githubProvider);
      getRedirectResult(auth)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          if (credential) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const token = credential.accessToken;
            // ...
          }

          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
        });
    };
  };

  return (
    <div>
      <button style={{ padding: '10px', margin: '50px' }} onClick={logInUser}>
        Login
      </button>
      <button
        style={{ padding: '10px', margin: '50px' }}
        onClick={createAccount}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthForm;
