import { createContext, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import jwt_decode, { JwtPayload } from "jwt-decode";


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
    // Check for nulls
    try {
      if (user == null) throw 'User not logged in or session expired'
      const decoded: JwtPayload = jwt_decode(user);
      let exp = decoded.exp
      if (exp) {
        exp = exp * 1000
        const now = Date.now();
        if (now > exp) {
          // If expired, log out.
          handleLogout();
        }
      }
    } catch (error) {
      console.log(error);
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