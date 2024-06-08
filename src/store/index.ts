import { create } from "zustand";
import { MATH_OPERATIONS } from "@/data/color-effects";
import { calculate } from "@/lib/utils";

export interface Player {
  id: string;
  name: string;
  value: number;
}

interface State {
  players: Player[];
  numberOfPlayers: number;
  amountOfRounds: number;
  currentRound: number;
  setPlayers: (p: Player[]) => void;
  updatePlayer: (
    id: string,
    betValue: number,
    colorEffectValue: number,
    operation: MATH_OPERATIONS | null
  ) => void;
  deletePlayer: (id: string) => void;
  setNumberOfPlayers: (n: number) => void;
  setAmountOfRounds: (n: number) => void;
  nextRound: () => void;
  resetStore: () => void;
}

const initialState = {
  players: [] as Player[],
  numberOfPlayers: 0,
  amountOfRounds: 0,
  currentRound: 1,
};

const useStore = create<State>(set => ({
  ...initialState,
  setPlayers: players => set({ players }),
  updatePlayer: (id, betValue, colorEffectValue, operation) =>
    set(state => {
      const updatedPlayers = [...state.players];
      const player = updatedPlayers.find(p => p.id === id);

      if (player) {
        if (operation) {
          const calculatedValue = calculate(
            betValue,
            colorEffectValue,
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
  setNumberOfPlayers: n => set({ numberOfPlayers: n }),
  setAmountOfRounds: n => set({ amountOfRounds: n }),
  nextRound: () => set(state => ({ currentRound: state.currentRound + 1 })),
  resetStore: () => set(initialState),
}));

export default useStore;
