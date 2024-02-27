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
  email: string | null;
}

const defaultValue: AuthContextType = {
  user: null,
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
  email: "",
};

// Creates a new context for authentication with the default value.
export const AuthContext = createContext(defaultValue);

type Props = {
  children: ReactNode;
};

export const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>("");
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
        setEmail(user.email);
      } else {
        console.log("no active user");
      }
    });
  };

  useEffect(() => {
    getActiveUser();
    setUserChecked(true);
  }, []);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
    // logout logic here
  };

  return (
    <AuthContext.Provider
      value={{ user, email, loginUser, signup, logoutUser, userChecked }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
