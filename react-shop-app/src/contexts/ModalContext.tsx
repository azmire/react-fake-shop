import { createContext, useState } from "react";
import {
  ModalContextType,
  ModalProviderProps,
} from "../@types/ModalContextTypes";

const defValue = {
  modal: false,
  openModal: () => {
    console.log("no provider");
  },
  closeModal: () => {
    console.log("no provider");
  },
};

export const ModalContext = createContext<ModalContextType>(defValue);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <ModalContext.Provider value={{ openModal, closeModal, modal }}>
      {children}
    </ModalContext.Provider>
  );
};
