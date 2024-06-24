import { Receipt, HeartHandshake, SkipForward, Drama } from "lucide-react";
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
        description: "Your next drawn effect is multiplied by 10.",
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
          "Steal 10% of the balance from the player with the highest balance.",
      },
    };

    return details[ability];
  };

  return { getAbilityDetails };
};

export default useAbilityDetails;
