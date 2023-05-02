import { useCallback, useState } from "react";
import {
  SelectContainer,
  SelectLabelButton,
  DropdownStyle,
  DropdownItem,
} from "./select.styles";
import { Service } from "../../../../context/services/services.types";

interface SelectProps {
  values: Service[];
  defaultValue: Service | undefined;
  onChange(service: Service | undefined): void;
}

export const Select = ({ values, defaultValue, onChange }: SelectProps) => {
  const [currentValue, setCurrentValue] = useState<Service | undefined>();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleValueChange = useCallback(
    (value: Service | undefined) => {
      setCurrentValue(value);
    },
    [setCurrentValue]
  );

  const handleChange = useCallback(
    (value: Service | undefined) => {
      return () => {
        handleValueChange(value);
        onChange(value);
        handleClose();
      };
    },
    [handleValueChange, onChange, handleClose]
  );

  const rednerItems = () => {
    return values.map((value) => (
      <DropdownItem
        onClick={handleChange(value)}
        active={value === currentValue}
        key={value.id}
      >
        {value.name}
      </DropdownItem>
    ));
  };

  return (
    <SelectContainer>
      <SelectLabelButton onClick={handleOpen}>
        {currentValue
          ? currentValue.name
          : defaultValue
          ? defaultValue.name
          : "Niezalezny"}
      </SelectLabelButton>
      <DropdownStyle isVisible={open}>
        <DropdownItem onClick={handleChange(undefined)} active={!currentValue}>
          Niezalezny
        </DropdownItem>
        {rednerItems()}
      </DropdownStyle>
    </SelectContainer>
  );
};
