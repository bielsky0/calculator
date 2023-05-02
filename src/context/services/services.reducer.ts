import { useEffect, useReducer } from "react";
import {
  REDUCER_ACTIONS,
  ServicesActions,
  ServicesServiceState,
} from "./services.types";
import {
  calculateComboPriceByYear,
  checkIfPriceForServiceExists,
  countSerivicePricesByYearAndType,
  filterCombinations,
  filterServices,
  filterServicesByAvaiableCombos,
  filterServicesByPickedCombos,
  findFreeServices,
} from "./services.helpers";

const dd = [
  {
    id: `${Math.random()}`,
    name: "Abonament Telefoniczny",
    prices: [{ year: 2023, price: 39 }],
    onlyWith: undefined,
  },
  {
    id: `${Math.random()}`,
    name: "Internet",
    prices: [{ year: 2023, price: 39 }],
    onlyWith: undefined,
  },
  {
    id: `${Math.random()}`,
    name: "Telewizja",
    prices: [{ year: 2023, price: 39 }],
    onlyWith: undefined,
  },
];

const initialServices = [
  ...dd,
  {
    id: `${Math.random()}`,
    name: "Dekoder 4K",
    prices: [{ year: 2023, price: 39 }],
    onlyWith: dd[2],
  },
];

export const INITIAL_STATE: ServicesServiceState = {
  services: initialServices,
  picked: [],
  filteredPickedByPickedCombos: [],
  filteredPickedByAvaiableCombos: [],
  totalPrice: 0,
  combointaion: [
    {
      id: `${Math.random()}`,
      services: [initialServices[0], initialServices[1]],
      name: "Internet + Abonament",
      forFree: undefined,
      price: [
        {
          year: 2023,
          price: 220,
        },
      ],
    },
    {
      id: `${Math.random()}`,
      services: [initialServices[1], initialServices[2]],
      name: "Internet + Telewizja",
      forFree: [initialServices[3]],
      price: [
        {
          year: 2023,
          price: 69,
        },
      ],
    },
  ],
  avaibleCombinations: [],
  pickedCombo: undefined,
  year: 2023,
};

function reducer(
  state: ServicesServiceState,
  action: ServicesActions
): ServicesServiceState {
  switch (action.type) {
    case REDUCER_ACTIONS.ADD_COMBINATION:
      return {
        ...state,
        combointaion: [...state.combointaion, action.payload.combination],
      };
    case REDUCER_ACTIONS.EDIT_SERVICE:
      const { id: serviceId, service } = action.payload;
      return {
        ...state,
        services: state.services.map((c) => {
          return c.id !== serviceId ? c : { ...c, ...service };
        }),
      };
    case REDUCER_ACTIONS.EDIT_COMBINATION:
      const { id: comboId, combination } = action.payload;

      return {
        ...state,
        combointaion: state.combointaion.map((c) => {
          return c.id !== comboId ? c : { ...c, ...combination };
        }),
      };
    case REDUCER_ACTIONS.ADD_SERVICE:
      return {
        ...state,
        services: [...state.services, action.payload.service],
      };
    case REDUCER_ACTIONS.SET_YEAR:
      return { ...state, year: action.payload.newYear };
    case REDUCER_ACTIONS.SET_AVAIABLE_COMBINATIONS:
      return { ...state, avaibleCombinations: action.payload.avaiableCombos };
    case REDUCER_ACTIONS.SET_FILTERED_PICKED_BY_AVAIABLE_COMBOS:
      return {
        ...state,
        filteredPickedByAvaiableCombos: action.payload.avaiableCombos,
      };
    case REDUCER_ACTIONS.SET_FILTERED_PICKED_BY_PICKED_COMBOS:
      return {
        ...state,
        filteredPickedByPickedCombos: action.payload.avaiableCombos,
      };
    case REDUCER_ACTIONS.PICK_SERVICE:
      const checkIfPicked = state.picked.some((pickedService) => {
        return pickedService.id === action.payload.service.id;
      });
      console.log(checkIfPicked, "dsds");
      if (!checkIfPicked)
        return { ...state, picked: [...state.picked, action.payload.service] };

      return state;

    case REDUCER_ACTIONS.SET_PICKED_COMBO:
      return { ...state, pickedCombo: action.payload.pickedCombo };
    case REDUCER_ACTIONS.SET_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload.totalPrice };

    case REDUCER_ACTIONS.UNPICK_SERVICE:
      console.log("UNPICK_SERVICE");

      return {
        ...state,
        picked: state.picked.filter(
          (pickedService) => pickedService.name !== action.payload.service.name
        ),
      };
    default:
      throw new Error("Cannot resolve auth reducer action type");
  }
}

export const useAuthReducer = (initialArg?: ServicesServiceState) => {
  const [auth, dispatchAuth] = useReducer(reducer, initialArg || INITIAL_STATE);

  console.log(auth);

  useEffect(() => {
    const total =
      countSerivicePricesByYearAndType(
        auth.year,
        filterServices(
          auth.filteredPickedByPickedCombos,
          findFreeServices(auth.pickedCombo, auth.services)
        )
      ) + calculateComboPriceByYear(auth.year, auth.pickedCombo);

    dispatchAuth({
      type: REDUCER_ACTIONS.SET_TOTAL_PRICE,
      payload: {
        totalPrice: total,
      },
    });
  }, [auth.year, auth.filteredPickedByPickedCombos, auth.pickedCombo]);

  useEffect(() => {
    if (auth.avaibleCombinations.length >= 2 && !auth.pickedCombo) {
      //TODO Pick cheapest combo
      dispatchAuth({
        type: REDUCER_ACTIONS.SET_PICKED_COMBO,
        payload: {
          pickedCombo: auth.avaibleCombinations[0],
        },
      });
    }
    if (auth.avaibleCombinations.length === 1) {
      dispatchAuth({
        type: REDUCER_ACTIONS.SET_PICKED_COMBO,
        payload: {
          pickedCombo: auth.avaibleCombinations[0],
        },
      });
    }

    if (auth.avaibleCombinations.length >= 2 && auth.pickedCombo) return;

    if (auth.avaibleCombinations.length < 1) {
      dispatchAuth({
        type: REDUCER_ACTIONS.SET_PICKED_COMBO,
        payload: {
          pickedCombo: undefined,
        },
      });
    }
  }, [auth.avaibleCombinations, auth.picked]);

  useEffect(() => {
    const avaibleCombinations = filterCombinations(
      auth.combointaion,
      auth.picked
    );

    dispatchAuth({
      type: REDUCER_ACTIONS.SET_AVAIABLE_COMBINATIONS,
      payload: {
        avaiableCombos: avaibleCombinations,
      },
    });
  }, [auth.combointaion, auth.picked]);

  useEffect(() => {
    const filteredPicked = filterServicesByAvaiableCombos(
      auth.avaibleCombinations,
      auth.picked
    );

    dispatchAuth({
      type: REDUCER_ACTIONS.SET_FILTERED_PICKED_BY_AVAIABLE_COMBOS,
      payload: {
        avaiableCombos: filteredPicked,
      },
    });
  }, [auth.avaibleCombinations, auth.picked]);

  useEffect(() => {
    const filteredPicked2 = filterServicesByPickedCombos(
      auth.pickedCombo,
      auth.picked
    );

    dispatchAuth({
      type: REDUCER_ACTIONS.SET_FILTERED_PICKED_BY_PICKED_COMBOS,
      payload: {
        avaiableCombos: filteredPicked2,
      },
    });
  }, [auth.pickedCombo, auth.picked]);

  useEffect(() => {
    if (auth.pickedCombo) {
      const freeServicesTypes = auth.pickedCombo.forFree;
      if (freeServicesTypes) {
        freeServicesTypes.forEach((type) => {
          const service = auth.services.find(
            (service) => service.id === type.id
          );

          if (service) {
            if (checkIfPriceForServiceExists(auth.year, service))
              dispatchAuth({
                type: REDUCER_ACTIONS.PICK_SERVICE,
                payload: {
                  service,
                },
              });
          }
        });
      }
    }
  }, [auth.pickedCombo]);

  return { auth, dispatchAuth };
};
