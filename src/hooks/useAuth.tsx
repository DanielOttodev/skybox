import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IAuthContext } from "../types";

export const useAuth = () : IAuthContext   => {
    return  useContext(AuthContext) 
  }