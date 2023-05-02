import { useCallback, useState } from "react";
import { Price } from "../../../../context/services/services.types";
import {
  Container,
  Label,
  PriceWrapper,
  PricesWrapper,
  AddWrapper,
  Button,
  InputWrapper,
  Input,
  RemoveButton,
} from "./pricesForm.styles";

interface PricesFormProps {
  setPrics(prices: Price): void;
  prices: Price[];
  removePrice(year: number): void;
}

export const PricesForm = ({
  setPrics,
  prices,
  removePrice,
}: PricesFormProps) => {
  //TODO
  // Add better validation
  const [year, setYear] = useState(new Date().getFullYear());
  const [price, setPrice] = useState(0);

  const handleAddNewPrice = useCallback(() => {
    const find = prices.find((pri) => pri.year === year);

    if (!find)
      setPrics({
        year: year,
        price: price,
      });
  }, [price, year, prices]);

  const handleRemovePrice = useCallback(
    (year: number) => {
      return () => {
        removePrice(year);
      };
    },
    [removePrice]
  );

  const onYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = e;
      setYear(Number(value));
    },
    [setYear]
  );

  const onPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = e;
      setPrice(Number(value));
    },
    [setPrice]
  );

  const renderPrices = () => {
    return prices.map((price) => {
      return (
        <PriceWrapper>
          <Label>
            {price.price} zł - {price.year}
          </Label>
          <RemoveButton onClick={handleRemovePrice(price.year)}>-</RemoveButton>
        </PriceWrapper>
      );
    });
  };

  return (
    <Container>
      <PricesWrapper>{renderPrices()}</PricesWrapper>

      <AddWrapper>
        <Button onClick={handleAddNewPrice}>+</Button>
        <InputWrapper>
          <Label>Cena</Label>
          <Input onChange={onPriceChange} value={price} type="number" />
        </InputWrapper>

        <InputWrapper>
          <Label>Rok</Label>
          <Input onChange={onYearChange} value={year} type="number" />
        </InputWrapper>
      </AddWrapper>
    </Container>
  );
};
