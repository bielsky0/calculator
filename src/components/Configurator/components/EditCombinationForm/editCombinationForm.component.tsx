import { useCallback, useEffect, useState } from "react";
import {
  Combination,
  Price,
  Service,
} from "../../../../context/services/services.types";
import {
  Container,
  Input,
  InputWrapper,
  Label,
  SubmitButton,
} from "./editCombinationForm.styles";
import { contextualizer } from "../../../../context";
import { ProvidedServices } from "../../../../context/contextualizer/contextualizer";
import { ServicesReducer } from "../../../../context/services/services.provider";
import { PricesForm } from "../PricesForm";
import { MultiSelect } from "../MultiSelect";

interface AddCombinationFormProps {
  initCombo?: Combination;
  onSumbit(service: Combination): void;
}

export const EditCombinationForm = ({
  onSumbit,
  initCombo,
}: AddCombinationFormProps) => {
  const [name, setName] = useState("");
  const [prices, setPrices] = useState<Price[]>([]);
  const [selectedServics, setSelectedServices] = useState<Service[]>([]);

  const {
    auth: { services },
  } = contextualizer.use<ServicesReducer>(ProvidedServices.ServicesService);

  useEffect(() => {
    if (initCombo) {
      setName(initCombo.name);
      setPrices(initCombo.price);
      setSelectedServices(initCombo.services);
    }
  }, []);

  const handleSumbit = useCallback(() => {
    onSumbit({
      id: `${Math.random()}`,
      name: name,
      services: selectedServics,
      price: prices,
      forFree: undefined,
    });
  }, [name, selectedServics, prices]);

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = e;
      setName(value);
    },
    [setName]
  );

  const onAddPrice = useCallback(
    (newPrice: Price) => {
      setPrices((prev) => {
        return [...prev, newPrice];
      });
    },
    [setPrices]
  );

  const onRemovePrice = useCallback(
    (year: number) => {
      setPrices((prev) => {
        return [...prev.filter((p) => p.year !== year)];
      });
    },
    [setPrices]
  );

  const toggleOption = (id: string) => {
    setSelectedServices((prevSelected) => {
      const newArray = [...prevSelected];

      const isSelected = newArray.some(
        (selectedOption) => selectedOption.id === id
      );
      if (isSelected) {
        return newArray.filter((item) => item.id !== id);
      } else {
        const service = services.find((service) => service.id === id);
        if (service) newArray.push(service);
        return newArray;
      }
    });
  };

  return (
    <Container>
      <InputWrapper>
        <Label>Nazwa</Label>
        <Input value={name} onChange={onNameChange} />
      </InputWrapper>

      <InputWrapper>
        <Label>Cena i rok</Label>
        <PricesForm
          removePrice={onRemovePrice}
          setPrics={onAddPrice}
          prices={prices}
        />
      </InputWrapper>

      <InputWrapper>
        <Label>Usługi w pakiecie</Label>

        <MultiSelect
          selected={selectedServics}
          options={services}
          toggleOption={toggleOption}
        />
      </InputWrapper>

      <InputWrapper>
        <SubmitButton onClick={handleSumbit}>Zatwierdź</SubmitButton>
      </InputWrapper>
    </Container>
  );
};
