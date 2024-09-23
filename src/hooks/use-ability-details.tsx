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
import useTranslation from "@/store/use-translation";
import t from "@/translations";

interface Details {
  icon: React.JSX.Element;
  title: string;
  description: string;
}

const useAbilityDetails = () => {
  const { lng } = useTranslation();

  const getAbilityDetails = (ability: Ability) => {
    const details: Record<Ability, Details> = {
      luckTrial: {
        icon: <Receipt />,
        title: t[lng].abilityDetails.luckTrial.title,
        description: t[lng].abilityDetails.luckTrial.description,
      },
      secondChance: {
        icon: <HeartHandshake />,
        title: t[lng].abilityDetails.secondChance.title,
        description: t[lng].abilityDetails.secondChance.description,
      },
      turnStealer: {
        icon: <SkipForward />,
        title: t[lng].abilityDetails.turnStealer.title,
        description: t[lng].abilityDetails.turnStealer.description,
      },
      luckThief: {
        icon: <Drama />,
        title: t[lng].abilityDetails.luckThief.title,
        description: t[lng].abilityDetails.luckThief.description,
      },
      doubleTrouble: {
        icon: <Grid2x2Check />,
        title: t[lng].abilityDetails.doubleTrouble.title,
        description: t[lng].abilityDetails.doubleTrouble.description,
      },
      balanceEqualizer: {
        icon: <Equal />,
        title: t[lng].abilityDetails.balanceEqualizer.title,
        description: t[lng].abilityDetails.balanceEqualizer.description,
      },
      sneakPeek: {
        icon: <ScanEye />,
        title: t[lng].abilityDetails.sneakPeek.title,
        description: t[lng].abilityDetails.sneakPeek.description,
      },
      balanceBooster: {
        icon: <HandCoins />,
        title: t[lng].abilityDetails.balanceBooster.title,
        description: t[lng].abilityDetails.balanceBooster.description,
      },
      timeWarp: {
        icon: <History />,
        title: t[lng].abilityDetails.timeWarp.title,
        description: t[lng].abilityDetails.timeWarp.description,
      },
    };

    return details[ability];
  };

  return { getAbilityDetails };
};

export default useAbilityDetails;
