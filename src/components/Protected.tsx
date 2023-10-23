import { Navigate, } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Protected = ({ children }: PropsWithChildren) => {

  const { user, checkToken } = useAuth();
  checkToken();
  if (!user) { // This is now a slight double up with checkToken
    return <Navigate to="/login" replace />;
  }

  return children;
};