import { Dispatch, ReactNode } from "react";
import {
  ProvidedServices,
  contextualizer,
} from "../contextualizer/contextualizer";
import { useAuthReducer } from "./services.reducer";
import { ServicesServiceState } from "./services.types";

interface ServicesServiceProviderProps {
  children: ReactNode;
}

export interface ServicesReducer {
  auth: ServicesServiceState;
  dispatchAuth: Dispatch<any>;
}

const ServicesServiceContext = contextualizer.createContext<ServicesReducer>(
  ProvidedServices.ServicesService
);

export const ServicesServiceProvider = ({
  children,
}: ServicesServiceProviderProps) => {
  const all = useAuthReducer();

  return (
    <ServicesServiceContext.Provider value={all}>
      {children}
    </ServicesServiceContext.Provider>
  );
};
