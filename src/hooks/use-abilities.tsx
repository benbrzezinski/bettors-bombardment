import { MouseEvent, useState } from "react";
import { MATH_OPERATIONS, colorEffects } from "@/data/color-effects";
import { ABILITIES, type Ability, COLORS, type Color } from "@/constants";
import { sortPlayers, getRandomInt } from "@/lib/utils";
import useStore from "@/store";

const useAbilities = () => {
  const [sneakPeekQuantity, setSneakPeekQuantity] = useState(0);
  const {
    players,
    setPlayerBalance,
    updatePlayerBalance,
    deletePlayerAbilityInUse,
  } = useStore();
  const sortedPlayers = sortPlayers(players);

  const getRandomizedAbilities = () => {
    const randomizedAbilities: Ability[] = [];

    while (randomizedAbilities.length < 3) {
      const randomIndex = getRandomInt(0, ABILITIES.length - 1);
      const ability = ABILITIES[randomIndex];

      if (randomizedAbilities.includes(ability)) continue;

      randomizedAbilities.push(ability);
    }

    return randomizedAbilities;
  };

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

  const runSneakPeek = (
    id: string,
    e: MouseEvent<HTMLButtonElement>,
    color: Color
  ) => {
    const btn = e.currentTarget;
    if (btn.hasAttribute("style")) return;

    const { operation } = colorEffects[color];
    const btnBorderColor =
      operation === MATH_OPERATIONS.Addition ||
      operation === MATH_OPERATIONS.Multiplication
        ? COLORS[1]
        : COLORS[0];

    btn.style.borderColor = btnBorderColor;
    btn.style.borderWidth = "2px";

    if (sneakPeekQuantity === 2) {
      deletePlayerAbilityInUse(id, ABILITIES[6]);
      return;
    }

    setSneakPeekQuantity(q => q + 1);
  };

  const runBalanceBooster = (id: string, value: number) => {
    const randomBooster = getRandomInt(10, 50);
    const randomBoost = Math.round((value / 10) * (randomBooster / 10));

    updatePlayerBalance(id, value, randomBoost, MATH_OPERATIONS.Addition);
  };

  const runTimeWarp = (id: string) => {
    const player = players.find(p => p.id === id);

    if (player && player.prevValue) {
      setPlayerBalance(player.id, player.prevValue);
    }
  };

  return {
    getRandomizedAbilities,
    runLuckThief,
    runBalanceEqualizer,
    runSneakPeek,
    runBalanceBooster,
    runTimeWarp,
  };
};

export default useAbilities;
