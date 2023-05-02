import { useCallback, useEffect, useState } from "react";
import { Price, Service } from "../../../../context/services/services.types";
import {
  Input,
  Label,
  InputWrapper,
  SubmitButton,
} from "./EditServiceForm.styles";
import { PricesForm } from "../PricesForm";
import { Select } from "../Select";
import { contextualizer } from "../../../../context";
import { ProvidedServices } from "../../../../context/contextualizer/contextualizer";
import { ServicesReducer } from "../../../../context/services/services.provider";

interface ServiceFormProps {
  initService?: Service;
  onSumbit(service: Partial<Service>): void;
}

export const EditServiceForm = ({
  initService,
  onSumbit,
}: ServiceFormProps) => {
  const [name, setName] = useState("");
  const [prices, setPrices] = useState<Price[]>([]);
  const [onlyWith, setOnlyWith] = useState<Service | undefined>();

  const {
    auth: { services },
  } = contextualizer.use<ServicesReducer>(ProvidedServices.ServicesService);

  useEffect(() => {
    if (initService) {
      setName(initService.name);
      setPrices(initService.prices);
      setOnlyWith(initService.onlyWith);
    }
  }, []);

  const onAddPrice = useCallback(
    (newPrice: Price) => {
      console.log(newPrice);
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

  const onOnlyWithChange = useCallback((service: Service | undefined) => {
    setOnlyWith(service);
  }, []);

  return (
    <div>
      <InputWrapper>
        <Label>Nazwa</Label>
        <Input
          value={name}
          onChange={(e) => {
            const {
              currentTarget: { value },
            } = e;
            setName(value);
          }}
        />
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
        <SubmitButton
          onClick={() => {
            onSumbit({
              name: name,
              onlyWith: onlyWith,
              prices: prices,
            });
          }}
        >
          Zatwierdź
        </SubmitButton>
      </InputWrapper>
    </div>
  );
};
