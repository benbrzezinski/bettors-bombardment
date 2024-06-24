import { MATH_OPERATIONS } from "@/data/color-effects";
import useStore from "@/store";

const useAbilities = () => {
  const { players, updatePlayerBalance } = useStore();

  const runLuckThief = (id: string, value: number) => {
    const sortedPlayers = [...players].sort((a, b) => {
      if (b.value !== a.value) {
        return b.value - a.value;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    const playerWithTheHighestBalance = sortedPlayers[0];
    const oneTenthOfTheValue = Math.round(
      playerWithTheHighestBalance.value / 10
    );

    updatePlayerBalance(
      playerWithTheHighestBalance.id,
      playerWithTheHighestBalance.value,
      oneTenthOfTheValue,
      MATH_OPERATIONS.Subtraction
    );
    updatePlayerBalance(
      id,
      value,
      oneTenthOfTheValue,
      MATH_OPERATIONS.Addition
    );
  };

  return { runLuckThief };
};

export default useAbilities;
