import { useEffect } from "react";
import {
  Container,
  Description,
  DescriptionWrapper,
  Price,
  PriceWrapper,
  Title,
  TitleWrapper,
} from "./service.styles";
import { Service as ServiceType } from "../../../../context/services/services.types";
import { checkIfPriceForServiceExists } from "../../../../context/services/services.helpers";

interface ServiceProps {
  service: ServiceType;
  isPicked: boolean;
  pick(service: ServiceType): void;
  unpick(service: ServiceType): void;
  year: number;
  isPickable: boolean;
}

function calculateServicePriceByYear(year: number, combo: ServiceType) {
  const price = combo.prices.find((p) => p.year === year)?.price || 0;
  return price;
}

export const Service = ({
  service,
  isPicked,
  pick,
  unpick,
  year,
  isPickable,
}: ServiceProps) => {
  const checkIfPriceExist = checkIfPriceForServiceExists(year, service);
  useEffect(() => {
    if (!isPickable) {
      unpick(service);
    }
  }, [isPickable]);

  return (
    <Container
      isPickable={isPickable && checkIfPriceExist}
      onClick={() => {
        if (isPickable && checkIfPriceExist) {
          if (isPicked) {
            console.log("ogi");
            unpick(service);
          }

          if (!isPicked) {
            pick(service);
          }
        }
      }}
      isPicked={isPicked}
    >
      <TitleWrapper>
        <Title>{service.name}</Title>
      </TitleWrapper>

      <DescriptionWrapper>
        {service.onlyWith && (
          <Description>Tylko z {service.onlyWith.name}</Description>
        )}
      </DescriptionWrapper>

      <PriceWrapper>
        {checkIfPriceExist ? (
          <Price>cena: {calculateServicePriceByYear(year, service)} zł</Price>
        ) : (
          <Description>Nie ma ceny dla tej usługi na dany rok</Description>
        )}
      </PriceWrapper>
    </Container>
  );
};
