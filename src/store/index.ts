import { create } from "zustand";
import { MATH_OPERATIONS } from "@/data/color-effects";
import type { Ability, AmountOfRounds } from "@/constants";
import { calculateBalance } from "@/lib/utils";

export interface Player {
  id: string;
  name: string;
  value: number;
  abilities?: Ability[];
}

interface InitialState {
  players: Player[];
  amountOfRounds: 0 | AmountOfRounds;
  currentRound: number;
}

interface State {
  players: Player[];
  amountOfRounds: 0 | AmountOfRounds;
  currentRound: number;
  setPlayers: (players: Player[]) => void;
  updatePlayerBalance: (
    id: string,
    betValue: number,
    effectValue: number,
    operation: MATH_OPERATIONS | null
  ) => void;
  deletePlayer: (id: string) => void;
  setAmountOfRounds: (n: AmountOfRounds) => void;
  nextRound: () => void;
  resetStore: () => void;
}

const initialState: InitialState = {
  players: [],
  amountOfRounds: 0,
  currentRound: 1,
};

const useStore = create<State>(set => ({
  ...initialState,
  setPlayers: players => set({ players }),
  updatePlayerBalance: (id, betValue, effectValue, operation) =>
    set(state => {
      const updatedPlayers = [...state.players];
      const player = updatedPlayers.find(p => p.id === id);

      if (player) {
        if (operation) {
          const calculatedValue = calculateBalance(
            betValue,
            effectValue,
            operation
          );

          calculatedValue < 0
            ? (player.value += -betValue)
            : (player.value += Math.round(calculatedValue) - betValue);
        } else {
          player.value = 0;
        }
      }

      return { players: updatedPlayers };
    }),
  deletePlayer: id =>
    set(state => {
      const updatedPlayers = state.players.filter(p => p.id !== id);
      return { players: updatedPlayers };
    }),
  setAmountOfRounds: n => set({ amountOfRounds: n }),
  nextRound: () => set(state => ({ currentRound: state.currentRound + 1 })),
  resetStore: () => set(initialState),
}));

export default useStore;
