import { useState, useCallback } from "react";
import { contextualizer } from "../../../../context";
import { ProvidedServices } from "../../../../context/contextualizer/contextualizer";
import { ServicesReducer } from "../../../../context/services/services.provider";
import {
  REDUCER_ACTIONS,
  Service,
} from "../../../../context/services/services.types";
import { ModalComponent } from "../../../Modal";
import { AddServiceForm } from "../AddServiceForm";
import { HeadingWrapper, Button } from "./AddService.styles";

export const AddService = () => {
  const [openServiceAddModal, setOpenServiceAddModal] = useState(false);

  const { dispatchAuth } = contextualizer.use<ServicesReducer>(
    ProvidedServices.ServicesService
  );

  const handleServiceAddSubmit = useCallback(
    (service: Service) => {
      dispatchAuth({
        type: REDUCER_ACTIONS.ADD_SERVICE,
        payload: {
          service: service,
        },
      });

      setOpenServiceAddModal(false);
    },
    [setOpenServiceAddModal, dispatchAuth]
  );

  return (
    <>
      <HeadingWrapper>
        <Button
          onClick={() => {
            setOpenServiceAddModal(true);
          }}
        >
          Dodaj usługę
        </Button>
      </HeadingWrapper>
      <ModalComponent
        isOpen={openServiceAddModal}
        onRequestClose={() => setOpenServiceAddModal(false)}
      >
        <AddServiceForm onSumbit={handleServiceAddSubmit} />
      </ModalComponent>
    </>
  );
};
