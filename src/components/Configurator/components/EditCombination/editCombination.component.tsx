import { useCallback, useState } from "react";
import { Combination } from "../Combination";
import { contextualizer } from "../../../../context";
import { ProvidedServices } from "../../../../context/contextualizer/contextualizer";
import { ServicesReducer } from "../../../../context/services/services.provider";
import { ModalComponent } from "../../../Modal";
import { EditCombinationForm } from "../EditCombinationForm";
import {
  HeadingWrapper,
  Heading,
  ServicesContainer,
} from "./editCombination.styles";
import {
  Combination as Type,
  REDUCER_ACTIONS,
} from "../../../../context/services/services.types";

export const EditCombination = () => {
  const [currentComboId, setCurrentComboId] = useState("");
  const [openCombinationEditModal, setOpenCombinationEditModal] =
    useState(false);

  const {
    auth: { combointaion },
    dispatchAuth,
  } = contextualizer.use<ServicesReducer>(ProvidedServices.ServicesService);

  const handleCombinationEditSubmit = useCallback(
    (combination: Partial<Type>) => {
      dispatchAuth({
        type: REDUCER_ACTIONS.EDIT_COMBINATION,
        payload: {
          id: currentComboId,
          combination: combination,
        },
      });

      setOpenCombinationEditModal(false);
    },
    [setOpenCombinationEditModal, dispatchAuth, currentComboId]
  );

  const openComboModal = useCallback(
    (id: string) => {
      setCurrentComboId(id);
      setOpenCombinationEditModal(true);
    },
    [currentComboId, setOpenCombinationEditModal]
  );

  const renderCombinations = () => {
    return combointaion.map((combo) => {
      return <Combination openModal={openComboModal} combo={combo} />;
    });
  };

  return (
    <>
      <HeadingWrapper>
        <Heading>Edytuj kombinacje</Heading>
      </HeadingWrapper>
      <ServicesContainer>{renderCombinations()}</ServicesContainer>

      <ModalComponent
        isOpen={openCombinationEditModal}
        onRequestClose={() => setOpenCombinationEditModal(false)}
      >
        <EditCombinationForm
          onSumbit={handleCombinationEditSubmit}
          initCombo={combointaion.find(({ id }) => id === currentComboId)}
        />
      </ModalComponent>
    </>
  );
};
