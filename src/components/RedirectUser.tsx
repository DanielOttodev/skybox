import {Navigate,} from 'react-router-dom';
import { PropsWithChildren } from 'react';
import {useAuth} from '../hooks/useAuth'; 
//  A simple wrapper to redirect an already signed in user to the dashboard /home page
  export const RedirectUser = ({ children } : PropsWithChildren ) => {
   
    const { user }  = useAuth();
    console.log('Protected:',user);
    
  
    if (user) {
      console.log('User signed in already')
      return <Navigate to="/home" replace />;
    }
  
    return children;
  };