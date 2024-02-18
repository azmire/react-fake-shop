import { createContext, useState } from "react";
import { AuthContextType, AuthProviderProps } from "../@types/AuthContextTypes";

const defaultValue = {
  user: false,
  loginUser: () => {
    console.log("no provider");
  },
  logoutUser: () => {
    console.log("no provider");
  },
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(false);

  const loginUser = () => {
    setUser(true);
  };
  const logoutUser = () => {
    setUser(false);
  };
  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
