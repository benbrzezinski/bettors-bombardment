import type { Ability } from "@/constants";
import { Receipt, HeartHandshake, SkipForward } from "lucide-react";

interface Details {
  icon: React.JSX.Element;
  title: string;
  description: string;
}

const useAbilities = () => {
  const getAbilityDetails = (ability: Ability) => {
    const details: Record<Ability, Details> = {
      "10x": {
        icon: <Receipt />,
        title: "Test Your Luck",
        description: "Your next drawn effect is multiplied by 10.",
      },
      secondChance: {
        icon: <HeartHandshake />,
        title: "Second Chance",
        description:
          "If you get zeroed out, you don't lose, but your balance is divided by 2.",
      },
      skipNextPlayer: {
        icon: <SkipForward />,
        title: "Skip Next Player",
        description:
          "The next player loses his turn. If this is used at the end of a round, the first player of the next round is skipped, if any.",
      },
    };

    return details[ability];
  };

  return { getAbilityDetails };
};

export default useAbilities;
