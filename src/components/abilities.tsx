"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ABILITIES, GAME_MODES, type Ability } from "@/constants";
import { cn, formatNumber } from "@/lib/utils";
import useStore, { type Player } from "@/store";
import useAbilityDetails from "@/hooks/use-ability-details";
import useAbilities from "@/hooks/use-abilities";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

interface AbilitiesProps {
  player: Player;
  betMade: boolean;
}

export default function Abilities({ player, betMade }: AbilitiesProps) {
  const { id, value, prevValue, abilities, abilitiesInUse } = player;
  const { gameMode, deletePlayerAbility, addPlayerAbilityInUse } = useStore();
  const { getAbilityDetails } = useAbilityDetails();
  const { runLuckThief, runBalanceEqualizer, runBalanceBooster, runTimeWarp } =
    useAbilities();
  const { lng } = useTranslation();

  const PRE_MOVE_ABILITIES: Ability[] = [
    ABILITIES[0],
    ABILITIES[1],
    ABILITIES[4],
    ABILITIES[6],
  ];

  const handleUseAbility = (ability: Ability) => {
    deletePlayerAbility(id, ability);

    if (ability === ABILITIES[3]) {
      runLuckThief(id, value);
      return;
    }

    if (ability === ABILITIES[5]) {
      runBalanceEqualizer(id);
      return;
    }

    if (ability === ABILITIES[7]) {
      runBalanceBooster(id, value);
      return;
    }

    if (ability === ABILITIES[8]) {
      runTimeWarp(id);
      return;
    }

    addPlayerAbilityInUse(id, ability);
  };

  return (
    (gameMode === GAME_MODES[1] || gameMode === GAME_MODES[2]) && (
      <ul className="flex justify-center flex-wrap gap-[20px]">
        {ABILITIES.map(ability => {
          const details = getAbilityDetails(ability);
          const isAbilityAvailable = abilities?.includes(ability);
          const isAbilityInUse = abilitiesInUse?.includes(ability);
          const isDisabled = PRE_MOVE_ABILITIES.includes(ability)
            ? betMade
            : value === 0;

          return (
            <TooltipProvider delayDuration={500} key={ability}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <li>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className={cn(
                            "relative size-[50px] rounded-full p-0",
                            isAbilityInUse && "disabled:opacity-100"
                          )}
                          variant={isAbilityInUse ? "default" : "outline"}
                          disabled={!isAbilityAvailable || isDisabled}
                        >
                          {details.icon}
                          {!isAbilityAvailable && !isAbilityInUse && (
                            <X
                              className="absolute text-destructive"
                              size={62}
                              strokeWidth={1}
                            />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{details.title}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {details.description}
                          </AlertDialogDescription>
                          {ability === ABILITIES[8] && (
                            <AlertDialogDescription style={{ marginTop: 0 }}>
                              {typeof prevValue === "number"
                                ? `${
                                    t[lng].abilities.timeWarpLabels[0]
                                  } ${formatNumber(prevValue)}$.`
                                : t[lng].abilities.timeWarpLabels[1]}
                            </AlertDialogDescription>
                          )}
                          <AlertDialogDescription className="font-medium text-destructive">
                            {t[lng].abilities.note}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t[lng].cancel}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleUseAbility(ability);
                            }}
                          >
                            {t[lng].abilities.action}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </li>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{details.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </ul>
    )
  );
}
