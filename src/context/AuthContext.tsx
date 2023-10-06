import {useState, createContext, PropsWithChildren} from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext } from "../types";



export const AuthContext = createContext<IAuthContext>(
  {token: false,
   onLogin:() => {},
   onLogout: () => {}
  });

  
export const AuthContextProvider = ({ children } : PropsWithChildren ) => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string | false>(() => {
      const token = localStorage.getItem("token");
   
      
      if(token){
        return token;
      }else{
        return false
      }
      
    });
    async function auth(): Promise<string>{
      // Need to do actual auth logic here...
      localStorage.setItem('token','mytoken')
      return 'token'
    }
    const handleLogin = async () => {
      const token = await auth()
      if(token){
        setToken(token)
        navigate('/home')
    
      }else{
        return Error('Unable to login')
      }
    }
    const handleLogout = () => {
      localStorage.removeItem('token')
      setToken('');
    };

    const value = {
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }
    
    return <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
}