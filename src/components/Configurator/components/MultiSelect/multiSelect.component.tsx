import { useCallback } from "react";
import { Service } from "../../../../context/services/services.types";
import {
  Checkbox,
  Container,
  Label,
  OptionContainer,
  OptionsContainer,
} from "./multiSelect.styles";

interface MultiSelectProps {
  options: Service[];
  selected: Service[];
  toggleOption(id: string): void;
}

export const MultiSelect = ({
  selected,
  options,
  toggleOption,
}: MultiSelectProps) => {
  const handleToggle = useCallback(
    (id: string) => {
      return () => {
        toggleOption(id);
      };
    },
    [toggleOption]
  );

  const renderOptions = () => {
    return options.map((option) => {
      const isSelected = selected.some(
        (selectedOption) => selectedOption.id === option.id
      );

      return (
        <OptionContainer>
          <Checkbox
            type="checkbox"
            checked={isSelected}
            onChange={handleToggle(option.id)}
          />
          <Label>{option.name}</Label>
        </OptionContainer>
      );
    });
  };

  return (
    <Container>
      <OptionsContainer>{renderOptions()}</OptionsContainer>
    </Container>
  );
};
