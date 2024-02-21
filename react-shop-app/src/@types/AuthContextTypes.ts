import { User } from "firebase/auth";
import { ReactNode } from "react";

export declare type AuthContextType = {
  user: User | null;
  loginUser: (email: string, password: string) => void;
  logoutUser: (email: string, password: string) => void;
};

export declare type AuthProviderProps = {
  children: ReactNode;
};
