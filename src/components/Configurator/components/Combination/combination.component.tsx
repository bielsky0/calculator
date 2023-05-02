import { Combination as ComboType } from "../../../../context/services/services.types";
import { Container, Title, TitleWrapper } from "./combination.styles";

interface CombinationProps {
  combo: ComboType;
  openModal(id: string): void;
}

export const Combination = ({ combo, openModal }: CombinationProps) => {
  return (
    <Container
      onClick={() => {
        openModal(combo.id);
      }}
    >
      <TitleWrapper>
        <Title>{combo.name}</Title>
      </TitleWrapper>
    </Container>
  );
};
