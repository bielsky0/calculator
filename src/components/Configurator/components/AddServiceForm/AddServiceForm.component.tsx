import { useCallback, useState } from "react";
import { Price, Service } from "../../../../context/services/services.types";
import {
  Input,
  Label,
  InputWrapper,
  SubmitButton,
  Container,
} from "./AddServiceForm.styles";
import { PricesForm } from "../PricesForm";
import { Select } from "../Select";
import { contextualizer } from "../../../../context";
import { ProvidedServices } from "../../../../context/contextualizer/contextualizer";
import { ServicesReducer } from "../../../../context/services/services.provider";

interface ServiceFormProps {
  onSumbit(service: Service): void;
}

export const AddServiceForm = ({ onSumbit }: ServiceFormProps) => {
  const [name, setName] = useState("");
  const [prices, setPrices] = useState<Price[]>([]);
  const [onlyWith, setOnlyWith] = useState<Service | undefined>();

  const {
    auth: { services },
  } = contextualizer.use<ServicesReducer>(ProvidedServices.ServicesService);

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

  const onOnlyWithChange = useCallback(
    (service: Service | undefined) => {
      setOnlyWith(service);
    },
    [setOnlyWith]
  );

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = e;
      setName(value);
    },
    [setName]
  );

  const handleSumbit = useCallback(() => {
    onSumbit({
      id: `${Math.random()}`,
      name: name,
      onlyWith: onlyWith,
      prices: prices,
    });
  }, [name, onlyWith, prices]);

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
        <Label>Wybierz usługę, od której będzie zalezna:</Label>

        <Select
          onChange={onOnlyWithChange}
          defaultValue={onlyWith}
          values={services}
        />
      </InputWrapper>

      <InputWrapper>
        <SubmitButton onClick={handleSumbit}>Zatwierdź</SubmitButton>
      </InputWrapper>
    </Container>
  );
};
