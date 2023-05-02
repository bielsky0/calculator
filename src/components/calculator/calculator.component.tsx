import {
  Container,
  Heading,
  HeadingWrapper,
  Input,
  InputLabel,
  InputWrapper,
  Price,
  PriceTitle,
  PriceWrapper,
  ServicesContainer,
} from "./calculator.styles";
import { contextualizer } from "../../context";

import { ProvidedServices } from "../../context/contextualizer/contextualizer";
import { Service } from "./components/Service/service.component";
import {
  Combination as ComboType,
  REDUCER_ACTIONS,
  Service as ServiceType,
} from "../../context/services/services.types";
import { useCallback } from "react";
import { ServicesReducer } from "../../context/services/services.provider";
import {
  isComboPickable,
  isPickable,
  isPickedCombo,
  isServicePicked,
} from "../../context/services/services.helpers";
import { Combination } from "./components/Combination";

export const Calculator = () => {
  const {
    auth: {
      picked,
      services,
      totalPrice,
      combointaion,
      avaibleCombinations,
      pickedCombo,
      year,
    },
    dispatchAuth,
  } = contextualizer.use<ServicesReducer>(ProvidedServices.ServicesService);

  const pick = useCallback((service: ServiceType) => {
    dispatchAuth({
      type: REDUCER_ACTIONS.PICK_SERVICE,
      payload: {
        service: service,
      },
    });
  }, []);

  const onYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    dispatchAuth({
      type: REDUCER_ACTIONS.SET_YEAR,
      payload: {
        newYear: Number(value),
      },
    });
  }, []);

  const unpick = useCallback((service: ServiceType) => {
    dispatchAuth({
      type: REDUCER_ACTIONS.UNPICK_SERVICE,
      payload: {
        service: service,
      },
    });
  }, []);

  const pickCombo = useCallback((combo: ComboType) => {
    dispatchAuth({
      type: REDUCER_ACTIONS.SET_PICKED_COMBO,
      payload: {
        pickedCombo: combo,
      },
    });
  }, []);

  const renderServices = () => {
    return services
      .sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((service) => (
        <Service
          isPicked={isServicePicked(service, picked)}
          service={service}
          pick={pick}
          unpick={unpick}
          year={year}
          isPickable={isPickable(picked, service)}
          key={service.id}
        />
      ));
  };

  const renderAvaiableCombos = () => {
    return combointaion
      .sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((combo) => {
        return (
          <Combination
            isPickable={isComboPickable(combo, avaibleCombinations, services)}
            pickCombo={pickCombo}
            combo={combo}
            isPicked={isPickedCombo(pickedCombo, combo)}
            key={combo.name}
            year={year}
          />
        );
      });
  };
  return (
    <Container>
      <HeadingWrapper>
        <Heading>Wybierz usługę</Heading>
        <InputWrapper>
          <InputLabel>Wybierz rok: </InputLabel>
          <Input
            type="number"
            min="1900"
            max="2100"
            value={year}
            onChange={onYearChange}
          />
        </InputWrapper>
      </HeadingWrapper>
      <ServicesContainer>{renderServices()}</ServicesContainer>

      <HeadingWrapper>
        <Heading>Wybierz zniżkę</Heading>
      </HeadingWrapper>
      <ServicesContainer>{renderAvaiableCombos()}</ServicesContainer>

      <PriceWrapper>
        <PriceTitle>Cena za całość:</PriceTitle>
        <Price>{totalPrice} zł</Price>
      </PriceWrapper>
    </Container>
  );
};
