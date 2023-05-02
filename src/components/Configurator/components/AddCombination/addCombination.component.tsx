import { useCallback, useState } from "react";
import { Button, HeadingWrapper } from "./addCombination.styles";
import { ModalComponent } from "../../../Modal";
import { AddCombinationForm } from "../AddCombinationForm";
import { contextualizer } from "../../../../context";
import { ProvidedServices } from "../../../../context/contextualizer/contextualizer";
import { ServicesReducer } from "../../../../context/services/services.provider";
import {
  Combination,
  REDUCER_ACTIONS,
} from "../../../../context/services/services.types";

export const AddCombination = () => {
  const [openCombinationAddModal, setOpenCombinationAddModal] = useState(false);

  const { dispatchAuth } = contextualizer.use<ServicesReducer>(
    ProvidedServices.ServicesService
  );

  const handleCombinationAddSubmit = useCallback(
    (combination: Combination) => {
      dispatchAuth({
        type: REDUCER_ACTIONS.ADD_COMBINATION,
        payload: {
          combination: combination,
        },
      });

      setOpenCombinationAddModal(false);
    },
    [setOpenCombinationAddModal, dispatchAuth]
  );

  return (
    <>
      <HeadingWrapper>
        <Button
          onClick={() => {
            setOpenCombinationAddModal(true);
          }}
        >
          Dodaj kombinacje
        </Button>
      </HeadingWrapper>

      <ModalComponent
        isOpen={openCombinationAddModal}
        onRequestClose={() => setOpenCombinationAddModal(false)}
      >
        <AddCombinationForm onSumbit={handleCombinationAddSubmit} />
      </ModalComponent>
    </>
  );
};
