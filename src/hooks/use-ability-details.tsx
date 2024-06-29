import {
  Receipt,
  HeartHandshake,
  SkipForward,
  Drama,
  Grid2x2Check,
  Equal,
  ScanEye,
  HandCoins,
  History,
} from "lucide-react";
import type { Ability } from "@/constants";

interface Details {
  icon: React.JSX.Element;
  title: string;
  description: string;
}

const useAbilityDetails = () => {
  const getAbilityDetails = (ability: Ability) => {
    const details: Record<Ability, Details> = {
      testYourLuck: {
        icon: <Receipt />,
        title: "Test Your Luck",
        description:
          "Your next drawn effect is multiplied by 10, whether it is positive or negative.",
      },
      secondChance: {
        icon: <HeartHandshake />,
        title: "Second Chance",
        description:
          "You are protected from being zeroed out, but when this happens, your balance will be halved.",
      },
      skipNextPlayer: {
        icon: <SkipForward />,
        title: "Skip Next Player",
        description:
          "The next player loses his turn. If this is used at the end of a round, the first player of the next round is skipped, if any.",
      },
      luckThief: {
        icon: <Drama />,
        title: "Luck Thief",
        description:
          "Steal 10% of the balance from the player who currently has the highest balance.",
      },
      doubleTrouble: {
        icon: <Grid2x2Check />,
        title: "Double Trouble",
        description:
          "The effect of the next field you reveal is applied twice, whether it is positive or negative.",
      },
      balanceEqualizer: {
        icon: <Equal />,
        title: "Balance Equalizer",
        description:
          "Equalize your balance with the player who currently has the closest balance to yours.",
      },
      sneakPeek: {
        icon: <ScanEye />,
        title: "Sneak Peek",
        description:
          "Check the three hidden fields of your choice to see if the effect is positive (green border) or negative (red border).",
      },
      balanceBooster: {
        icon: <HandCoins />,
        title: "Balance Booster",
        description:
          "Instantly increase your balance by a random amount between 10% and 50% of your current balance.",
      },
      timeWarp: {
        icon: <History />,
        title: "Time Warp",
        description: "Undo the last balance change.",
      },
    };

    return details[ability];
  };

  return { getAbilityDetails };
};

export default useAbilityDetails;
