import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

interface IProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: IProps) => {
  const { isLogged } = useAppSelector((state) => state.auth);

  if (!isLogged) {
    return <Navigate to="/welcome" />;
  }

  return children;
};

export default RequireAuth;
