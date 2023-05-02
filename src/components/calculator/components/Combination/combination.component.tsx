import {
  calculateComboPriceByYear,
  checkIfPriceForCombinationExists,
} from "../../../../context/services/services.helpers";
import { Combination as ComboType } from "../../../../context/services/services.types";
import {
  Container,
  Description,
  DescriptionWrapper,
  Price,
  PriceWrapper,
  Title,
  TitleWrapper,
} from "./combination.styles";

interface CombinationProps {
  combo: ComboType;
  isPicked: boolean;
  pickCombo(combo: ComboType): void;
  year: number;
  isPickable: {
    isPickable: boolean;
    reason: string;
  };
}

export const Combination = ({
  combo,
  isPicked,
  pickCombo,
  year,
  isPickable,
}: CombinationProps) => {
  const checkIfPriceExists = checkIfPriceForCombinationExists(year, combo);
  const renderFreeServices = () => {
    return (
      combo.forFree &&
      combo.forFree.map((free) => {
        return <Description>{free.name}</Description>;
      })
    );
  };

  return (
    <Container
      isPickable={isPickable.isPickable && checkIfPriceExists}
      onClick={() => {
        if (!isPickable.isPickable && checkIfPriceExists) return;
        pickCombo(combo);
      }}
      isPicked={isPicked}
    >
      <TitleWrapper>
        <Title>{combo.name}</Title>
      </TitleWrapper>

      <DescriptionWrapper>
        {combo.forFree && <Description>Za darmo w pakiecie:</Description>}
        {renderFreeServices()}
      </DescriptionWrapper>

      <DescriptionWrapper>
        <Description>
          {isPickable.isPickable ? "" : isPickable.reason}
        </Description>
      </DescriptionWrapper>
      <PriceWrapper>
        {checkIfPriceExists ? (
          <Price>cena: {calculateComboPriceByYear(year, combo)} zł</Price>
        ) : (
          <Description>Nie ma ceny dla tego pakietu na dany rok</Description>
        )}
      </PriceWrapper>
    </Container>
  );
};
