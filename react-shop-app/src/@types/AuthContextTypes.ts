import { ReactNode } from "react";

export declare type AuthContextType = {
  user: boolean;
  loginUser: () => void | boolean;
  logoutUser: () => void | boolean;
};

export declare type AuthProviderProps = {
  children: ReactNode;
};
