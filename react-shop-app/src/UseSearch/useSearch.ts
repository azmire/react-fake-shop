import { useState, useEffect } from "react";

export const useSearch = () => {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  useEffect(() => {}, []);

  return { inputValue, handleInputChange };
};
