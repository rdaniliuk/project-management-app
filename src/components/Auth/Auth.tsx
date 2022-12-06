import React, { useEffect } from 'react';
import SignIn from 'components/SignIn/SignIn';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUp from 'components/SignUp/SignUp';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { loadToken } from 'store/authSlice';

const Auth = () => {
  const { state } = useLocation();
  const isSignUp: boolean = state?.isSignUp || false;
  const { isLogged } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  useEffect(() => {
    if (isLogged) {
      navigate('/', { replace: true });
    }
  }, [isLogged, navigate]);

  return (
    <>
      {!isSignUp && <SignIn />}
      {isSignUp && <SignUp />}
    </>
  );
};

export default Auth;
