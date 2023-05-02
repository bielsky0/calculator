import { ReactNode } from "react";
import { ServicesServiceProvider } from "../services/services.provider";

interface GlobalContextProvider {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: GlobalContextProvider) => {
  return <ServicesServiceProvider>{children}</ServicesServiceProvider>;
};
