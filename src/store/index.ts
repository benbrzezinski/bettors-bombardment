import { MATH_OPERATIONS } from "@/data/color-effects";
import { calculate } from "@/lib/utils";
import { create } from "zustand";

interface Player {
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
  removePlayer: (id: string) => void;
  setNumberOfPlayers: (n: number) => void;
  setAmountOfRounds: (n: number) => void;
  nextRound: () => void;
  resetStore: () => void;
}

const initialState = {
  players: [
    // { id: "1", name: "ben", value: 1000 },
    // { id: "2", name: "sara", value: 1001 },
  ],
  numberOfPlayers: 0,
  amountOfRounds: 0,
  currentRound: 0,
};

const useStore = create<State>(set => ({
  ...initialState,
  setPlayers: p => set({ players: p }),
  updatePlayer: (id, betValue, colorEffectValue, operation) =>
    set(state => {
      const updatedPlayers = [...state.players];
      const player = updatedPlayers.find(p => p.id === id);

      if (player) {
        const newValue = calculate(betValue, colorEffectValue, operation);
        player.value += Math.round(newValue);
      }

      return { players: updatedPlayers };
    }),
  removePlayer: id =>
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
