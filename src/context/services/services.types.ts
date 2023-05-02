export type Price = {
  year: number;
  price: number;
};

export type Service = {
  name: string;
  id: string;
  prices: Price[];
  onlyWith: Service | undefined;
};

export type Combination = {
  id: string;
  services: Service[];
  price: Price[];
  name: string;
  forFree: Service[] | undefined;
};

export interface ServicesServiceState {
  services: Service[];
  picked: Service[];
  totalPrice: number;
  combointaion: Combination[];
  avaibleCombinations: Combination[];
  filteredPickedByPickedCombos: Service[];
  filteredPickedByAvaiableCombos: Service[];
  pickedCombo: Combination | undefined;
  year: number;
}

export enum REDUCER_ACTIONS {
  SET_YEAR = "setYear",
  PICK_SERVICE = "pickService",
  UNPICK_SERVICE = "unpickService",
  SET_TOTAL_PRICE = "setTotalPrice",
  SET_AVAIABLE_COMBINATIONS = "setAvaiableCombinations",
  SET_FILTERED_PICKED_BY_PICKED_COMBOS = "setFilteredPickedByPickedCombos",
  SET_FILTERED_PICKED_BY_AVAIABLE_COMBOS = "setFilteredPickedByAvaiableCombos",
  SET_PICKED_COMBO = "setPickedCombo",
  ADD_SERVICE = "addService",
  EDIT_SERVICE = "editService",
  REMOVE_SERVICE = "removeService",
  ADD_COMBINATION = "addCOMBINATION",
  EDIT_COMBINATION = "editCOMBINATION",
  REMOVE_COMBINATION = "removeService",
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ServicesPayload = {
  [REDUCER_ACTIONS.SET_YEAR]: {
    newYear: number;
  };
  [REDUCER_ACTIONS.PICK_SERVICE]: {
    service: Service;
  };
  [REDUCER_ACTIONS.SET_AVAIABLE_COMBINATIONS]: {
    avaiableCombos: Combination[];
  };
  [REDUCER_ACTIONS.SET_FILTERED_PICKED_BY_AVAIABLE_COMBOS]: {
    avaiableCombos: Service[];
  };
  [REDUCER_ACTIONS.SET_FILTERED_PICKED_BY_PICKED_COMBOS]: {
    avaiableCombos: Service[];
  };
  [REDUCER_ACTIONS.SET_TOTAL_PRICE]: {
    totalPrice: number;
  };
  [REDUCER_ACTIONS.UNPICK_SERVICE]: {
    service: Service;
  };
  [REDUCER_ACTIONS.SET_PICKED_COMBO]: {
    pickedCombo: Combination | undefined;
  };
  [REDUCER_ACTIONS.ADD_SERVICE]: {
    service: Service;
  };
  [REDUCER_ACTIONS.EDIT_SERVICE]: {
    id: string;
    service: Service;
  };
  [REDUCER_ACTIONS.ADD_COMBINATION]: {
    combination: Combination;
  };
  [REDUCER_ACTIONS.EDIT_COMBINATION]: {
    id: string;
    combination: Combination;
  };
};

export type ServicesActions =
  ActionMap<ServicesPayload>[keyof ActionMap<ServicesPayload>];
