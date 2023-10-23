import { createContext, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import jwt_decode, { JwtHeader, JwtPayload } from "jwt-decode";


export const AuthContext = createContext<IAuthContext>(
  {
    user: false,
    onLogin: () => { },
    onLogout: () => { },
    checkToken: () => { }
  });


export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage("token", null)

  const handleLogin = async (data: string) => {
    setUser(data);
    navigate('/home')
  }
  function checkToken(): void {
    const decoded: JwtPayload = jwt_decode(user);
    console.log('date', Date.now())
    let exp = decoded.exp
    if (exp) {
      exp = exp * 1000
      const now = Date.now();
      if (now > exp) {
        // If expired, log out.
        handleLogout();
      }
    }
  }
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    checkToken: checkToken
  }

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}