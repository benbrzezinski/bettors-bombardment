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
  setNumberOfPlayers: (n: number) => void;
  setAmountOfRounds: (n: number) => void;
  nextRound: () => void;
}

const useStore = create<State>(set => ({
  players: [],
  numberOfPlayers: 0,
  amountOfRounds: 0,
  currentRound: 0,
  setPlayers: p => set(() => ({ players: p })),
  setNumberOfPlayers: n => set(() => ({ numberOfPlayers: n })),
  setAmountOfRounds: n => set(() => ({ amountOfRounds: n })),
  nextRound: () => set(state => ({ currentRound: state.currentRound + 1 })),
}));

export default useStore;
