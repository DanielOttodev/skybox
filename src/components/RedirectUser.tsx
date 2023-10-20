import { Navigate, } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAuth } from '../hooks/useAuth';
//  A simple wrapper to redirect an already signed in user to the dashboard /home page
export const RedirectUser = ({ children }: PropsWithChildren) => {

  const { user } = useAuth();
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}