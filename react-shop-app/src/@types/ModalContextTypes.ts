import { ReactNode } from "react";

export declare type ModalContextType = {
  modal: boolean;
  openModal: () => void | boolean;
  closeModal: () => void | boolean;
};

export declare type ModalProviderProps = {
  children: ReactNode;
};
