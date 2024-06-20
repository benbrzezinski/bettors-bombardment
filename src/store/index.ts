import { create } from "zustand";
import { MATH_OPERATIONS } from "@/data/color-effects";
import { calculateBalance } from "@/lib/utils";
import {
  ABILITIES,
  GAME_MODES,
  type Ability,
  type AmountOfRounds,
  type GameMode,
} from "@/constants";

export interface Player {
  id: string;
  name: string;
  value: number;
  abilities?: Ability[];
  abilitiesInUse?: Ability[];
}

interface InitialState {
  players: Player[];
  amountOfRounds: 0;
  currentRound: 1;
  gameMode: (typeof GAME_MODES)[0];
}

interface State {
  players: Player[];
  amountOfRounds: 0 | AmountOfRounds;
  currentRound: number;
  gameMode: GameMode;
  setPlayers: (players: Player[]) => void;
  updatePlayerBalance: (
    id: string,
    betValue: number,
    effectValue: number,
    operation: MATH_OPERATIONS | null
  ) => void;
  deletePlayer: (id: string) => void;
  deletePlayerAbility: (id: string, ability: Ability) => void;
  addPlayerAbilityInUse: (id: string, ability: Ability) => void;
  deletePlayerAbilityInUse: (id: string, ability: Ability) => void;
  setAmountOfRounds: (amountOfRounds: AmountOfRounds) => void;
  nextRound: () => void;
  setGameMode: (gameMode: GameMode) => void;
  resetStore: () => void;
}

const initialState: InitialState = {
  players: [],
  amountOfRounds: 0,
  currentRound: 1,
  gameMode: GAME_MODES[0],
};

const useStore = create<State>(set => ({
  ...initialState,
  setPlayers: players => set({ players }),
  updatePlayerBalance: (id, betValue, effectValue, operation) =>
    set(state => {
      const updatedPlayers = [...state.players];
      const player = updatedPlayers.find(p => p.id === id);

      if (player) {
        const originalValue = player.value;

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

        if (
          state.gameMode === GAME_MODES[1] &&
          player.abilitiesInUse?.includes(ABILITIES[1]) &&
          player.value === 0
        ) {
          player.value = Math.round(originalValue / 2);
        }

        if (
          state.gameMode === GAME_MODES[1] &&
          player.abilitiesInUse?.includes(ABILITIES[1])
        ) {
          state.deletePlayerAbilityInUse(player.id, ABILITIES[1]);
        }
      }

      return { players: updatedPlayers };
    }),
  deletePlayer: id =>
    set(state => {
      const updatedPlayers = state.players.filter(p => p.id !== id);
      return { players: updatedPlayers };
    }),
  deletePlayerAbility: (id, ability) =>
    set(state => {
      const updatedPlayers = [...state.players];
      const player = updatedPlayers.find(p => p.id === id);

      if (player && player.abilities) {
        const index = player.abilities.findIndex(value => value === ability);

        if (index !== -1) {
          player.abilities.splice(index, 1);
        }
      }

      return { players: updatedPlayers };
    }),
  addPlayerAbilityInUse: (id, ability) =>
    set(state => {
      const updatedPlayers = [...state.players];
      const player = updatedPlayers.find(p => p.id === id);

      if (player && player.abilitiesInUse) {
        player.abilitiesInUse.push(ability);
      }

      return { players: updatedPlayers };
    }),
  deletePlayerAbilityInUse: (id, ability) =>
    set(state => {
      const updatedPlayers = [...state.players];
      const player = updatedPlayers.find(p => p.id === id);

      if (player && player.abilitiesInUse) {
        const index = player.abilitiesInUse.findIndex(
          value => value === ability
        );

        if (index !== -1) {
          player.abilitiesInUse.splice(index, 1);
        }
      }

      return { players: updatedPlayers };
    }),
  setAmountOfRounds: amountOfRounds => set({ amountOfRounds }),
  nextRound: () => set(state => ({ currentRound: state.currentRound + 1 })),
  setGameMode: gameMode => set({ gameMode }),
  resetStore: () => set(initialState),
}));

export default useStore;
