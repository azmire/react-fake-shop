/* import { createContext } from "react";

export const SearchContext = createContext(""); */

import { createContext, useState } from "react";
import { ModalProviderProps } from "../@types/ModalContextTypes";

const defValue = {
  input: "",
  search: (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  },
};

export const SearchContext = createContext(defValue);

export const SearchProvider = ({ children }: ModalProviderProps) => {
  const [input, setInput] = useState("");
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SearchContext.Provider value={{ search, input }}>
      {children}
    </SearchContext.Provider>
  );
};
