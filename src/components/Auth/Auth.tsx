import React from 'react';
import SignIn from 'components/SignIn/SignIn';
import { useLocation } from 'react-router-dom';
import SignUp from 'components/SignUp/SignUp';

const Auth = () => {
  const { state } = useLocation();
  const isSignUp: boolean = state?.isSignUp || false;

  return (
    <>
      {!isSignUp && <SignIn />}
      {isSignUp && <SignUp />}
    </>
  );
};

export default Auth;
