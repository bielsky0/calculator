import { Combination, Service } from "./services.types";

export function calculateComboPriceByYear(
  year: number,
  combo: Combination | undefined
) {
  if (!combo) return 0;
  const price = combo.price.find((p) => p.year === year)?.price || 0;
  return price;
}

export function filterCombinations(
  combinations: Combination[],
  services: Service[]
): Combination[] {
  return combinations.filter((combination) =>
    combination.services.every((type) =>
      services.some((service) => service.id === type.id)
    )
  );
}

export function filterServicesByAvaiableCombos(
  combinations: Combination[],
  services: Service[]
): Service[] {
  return services.filter((service) => {
    return !combinations.some((combo) => {
      const t = combo.services.some((type) => service.id === type.id);
      return t;
    });
  });
}

export function filterServicesByPickedCombos(
  combination: Combination | undefined,
  services: Service[]
): Service[] {
  if (!combination) return services;
  return services.filter((service) => {
    const t = combination.services.some((type) => service.id === type.id);
    return !t;
  });
}

export function countSerivicePricesByYearAndType(
  year: number,
  services: Service[]
) {
  const result = services.reduce((accumulator, service) => {
    const servicePrice = service.prices.find(
      (price) => price.year === year
    )?.price;
    if (servicePrice) {
      accumulator += servicePrice;
    }
    return accumulator;
  }, 0);

  return result;
}

export function isPickable(
  pickedServices: Service[],
  service: Service
): boolean {
  if (!service.onlyWith) return true;

  const t = pickedServices.find((dd) => {
    return dd.id === service.onlyWith?.id;
  });
  return t ? true : false;
}

export const isComboPickable = (
  combo: Combination,
  avaiableCombos: Combination[],
  services: Service[]
) => {
  return {
    isPickable: avaiableCombos.some((avaiableCombo) => {
      return avaiableCombo.name === combo.name;
    }),
    reason: makeReason(combo.services, services),
  };
};

export const isServicePicked = (serviceType: Service, picked: Service[]) => {
  return picked.some((pickedService) => pickedService.id === serviceType.id);
};

export const isPickedCombo = (
  pickedCombo: Combination | undefined,
  combo: Combination
) => {
  if (!pickedCombo) return false;

  return pickedCombo.name === combo.name;
};

export const makeReason = (serviceTypes: Service[], services: Service[]) => {
  const namesOfServices = serviceTypes.map((serviceType) => {
    const service = findService(serviceType, services);

    if (!service) return "";

    return service.name;
  });

  return `Aby wybrać pakiet musisz najpier wybrać te usługi: ${namesOfServices.join(
    ", "
  )}`;
};

export const findService = (serviceTypes: Service, services: Service[]) => {
  return services.find((service) => service.id === serviceTypes.id);
};

export const findFreeServices = (
  combinations: Combination | undefined,
  pickedServices: Service[]
) => {
  if (!combinations) return [];
  const freeServices = combinations.forFree?.map((freeService) => freeService);

  if (!freeServices) return [];

  return freeServices.filter((freeService) => {
    return pickedServices.some(
      (pickedService) => pickedService.id === freeService.id
    );
  });
};

export const filterServices = (
  pickedServices: Service[],
  freeServices: Service[]
) => {
  return pickedServices.filter(
    (ar) => !freeServices.find((rm) => rm.id === ar.id)
  );
};

export const checkIfPriceForServiceExists = (
  year: number,
  service: Service
) => {
  return service.prices.some((price) => price.year === year);
};

export const checkIfPriceForCombinationExists = (
  year: number,
  combination: Combination
) => {
  return combination.price.some((price) => price.year === year);
};
