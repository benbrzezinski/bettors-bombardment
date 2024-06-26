import { MATH_OPERATIONS } from "@/data/color-effects";
import { sortPlayers } from "@/lib/utils";
import useStore from "@/store";

const useAbilities = () => {
  const { players, updatePlayerBalance } = useStore();

  const sortedPlayers = sortPlayers(players);

  const runLuckThief = (id: string, value: number) => {
    const playersWithTheHighestBalance = sortedPlayers.filter(
      player => player.value === sortedPlayers[0].value
    );

    const playerWithTheHighestBalance =
      playersWithTheHighestBalance.find(player => player.id !== id) ??
      sortedPlayers[0];

    if (playerWithTheHighestBalance.id === id) return;

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

  const runBalanceEqualizer = (id: string) => {
    const currentPlayerIndex = sortedPlayers.findIndex(
      player => player.id === id
    );

    if (currentPlayerIndex !== -1) {
      const currentPlayerValue = sortedPlayers[currentPlayerIndex].value;
      const betterPlayerValue = sortedPlayers.at(currentPlayerIndex - 1)?.value;
      const worsePlayerValue = sortedPlayers.at(currentPlayerIndex + 1)?.value;

      if (
        currentPlayerValue === betterPlayerValue ||
        currentPlayerValue === worsePlayerValue
      ) {
        return;
      }

      if (betterPlayerValue && worsePlayerValue) {
        const differenceWithBetterPlayer =
          betterPlayerValue - currentPlayerValue;
        const differenceWithWorsePlayer = currentPlayerValue - worsePlayerValue;

        return differenceWithBetterPlayer < differenceWithWorsePlayer
          ? updatePlayerBalance(
              id,
              currentPlayerValue,
              differenceWithBetterPlayer,
              MATH_OPERATIONS.Addition
            )
          : updatePlayerBalance(
              id,
              currentPlayerValue,
              differenceWithWorsePlayer,
              MATH_OPERATIONS.Subtraction
            );
      }

      if (betterPlayerValue) {
        return updatePlayerBalance(
          id,
          currentPlayerValue,
          betterPlayerValue - currentPlayerValue,
          MATH_OPERATIONS.Addition
        );
      }

      if (worsePlayerValue) {
        return updatePlayerBalance(
          id,
          currentPlayerValue,
          currentPlayerValue - worsePlayerValue,
          MATH_OPERATIONS.Subtraction
        );
      }
    }
  };

  return { runLuckThief, runBalanceEqualizer };
};

export default useAbilities;
