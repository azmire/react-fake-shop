/* import { createContext, useState } from "react";
import { AuthContextType, AuthProviderProps } from "../@types/AuthContextTypes";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
const defaultValue: AuthContextType = {
  user: null,
  loginUser: () => {
    console.log("no provider");
  },
  logoutUser: () => {
    console.log("no provider");
  },
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const loginU = (email: string, password: string) => {
    console.log("Sign in called with", email, password);
  };
  const signup = (email: string, password: string) => {
    console.log("Sign up called with", email, password);
  };

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  const loginUser = () => {
    setUser(true);
  };
  const logoutUser = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
 */

import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig.ts";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logoutUser: () => void;
  userChecked: boolean;
}

// sets the default value for the authentication context.
const defaultValue: AuthContextType = {
  user: null, // by default, the user is set to indicate no provider is present.
  loginUser: () => {
    throw Error("signin function not implemented");
  },
  signup: () => {
    throw Error("signup function not implemented");
  },
  logoutUser: () => {
    throw Error("logout function not implemented");
  },
  userChecked: false,
};

// Creates a new context for authentication with the default value.
export const AuthContext = createContext(defaultValue);

type Props = {
  children: ReactNode;
};

export const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [userChecked, setUserChecked] = useState<boolean>(false);
  const loginUser = (email: string, password: string) => {
    // signin logic goes here
    console.log("Signin called with:", email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const signup = (email: string, password: string) => {
    // signup logic goes here
    console.log("Signup called with:", email, password);
    console.log("auth :>> ", auth);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential :>> ", userCredential);
        // Signed up
        const user = userCredential.user;
        setUser(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode :>> ", errorCode);
        console.log("errorMessage :>> ", errorMessage);
        // ..
      });
  };

  const getActiveUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("active user", user);
        setUser(user);
      } else {
        console.log("no active user");
      }
    });
  };

  useEffect(() => {
    getActiveUser();
    setUserChecked(true);
  }, []);

  console.log("user :>> ", user);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log("error :>> ", error);
      });
    // logout logic here
    // refactor when we are dealing with a real authentication provider
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, signup, logoutUser, userChecked }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
