import { ReactNode, createContext, useState } from "react";

const defaultValue = "No provider";

interface AuthContextType {
  user: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | string>(
  defaultValue
);

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
