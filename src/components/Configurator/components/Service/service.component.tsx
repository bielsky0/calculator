import { Container, Title, TitleWrapper } from "./service.styles";

import { Service as ServiceType } from "../../../../context/services/services.types";

interface ServiceProps {
  service: ServiceType;
  openModal(id: string): void;
}

export const Service = ({ service, openModal }: ServiceProps) => {
  return (
    <Container
      onClick={() => {
        openModal(service.id);
      }}
    >
      <TitleWrapper>
        <Title>{service.name}</Title>
      </TitleWrapper>
    </Container>
  );
};
