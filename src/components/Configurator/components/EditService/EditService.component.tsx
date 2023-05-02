import { useState, useCallback } from "react";
import { contextualizer } from "../../../../context";
import { ProvidedServices } from "../../../../context/contextualizer/contextualizer";
import { ServicesReducer } from "../../../../context/services/services.provider";
import {
  REDUCER_ACTIONS,
  Service,
} from "../../../../context/services/services.types";
import {
  HeadingWrapper,
  Heading,
  ServicesContainer,
} from "../../configurator.styles";
import { Service as ServiceComponent } from "../Service";
import { EditServiceForm } from "../EditServiceForm";
import { ModalComponent } from "../../../Modal";

export const EditService = () => {
  const [openServiceEditModal, setOpenServiceEditModal] = useState(false);

  const [currentServiceId, setCurrentServiceId] = useState("");

  const {
    auth: { services },
    dispatchAuth,
  } = contextualizer.use<ServicesReducer>(ProvidedServices.ServicesService);

  const openServiceModal = useCallback(
    (id: string) => {
      setCurrentServiceId(id);
      setOpenServiceEditModal(true);
    },
    [currentServiceId, setOpenServiceEditModal]
  );

  const handleServiceEditSubmit = useCallback(
    (service: Partial<Service>) => {
      dispatchAuth({
        type: REDUCER_ACTIONS.EDIT_SERVICE,
        payload: {
          id: currentServiceId,
          service: service,
        },
      });

      setOpenServiceEditModal(false);
    },
    [setOpenServiceEditModal, dispatchAuth, currentServiceId]
  );

  const renderServices = () => {
    return services
      .sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((service) => (
        <ServiceComponent
          openModal={openServiceModal}
          service={service}
          key={service.id}
        />
      ));
  };

  return (
    <>
      <HeadingWrapper>
        <Heading>Edytuj usługę</Heading>
      </HeadingWrapper>
      <ServicesContainer>{renderServices()}</ServicesContainer>

      <ModalComponent
        isOpen={openServiceEditModal}
        onRequestClose={() => setOpenServiceEditModal(false)}
      >
        <EditServiceForm
          onSumbit={handleServiceEditSubmit}
          initService={services.find(({ id }) => id === currentServiceId)}
        />
      </ModalComponent>
    </>
  );
};
