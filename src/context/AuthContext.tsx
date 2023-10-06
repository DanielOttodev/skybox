import { createContext, PropsWithChildren} from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";



export const AuthContext = createContext<IAuthContext>(
  {user: false,
   onLogin:() => {},
   onLogout: () => {},
  });

  
export const AuthContextProvider = ({ children } : PropsWithChildren ) => {
    const navigate = useNavigate()
    const [user,setUser] = useLocalStorage("token",null)

    const handleLogin = async (data : string) => {
      setUser(data);
      navigate('/home')
    }
    const handleLogout = () => {
      setUser(null);
      navigate("/login");
    };

    const value = {
      user,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }
    
    return <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
}