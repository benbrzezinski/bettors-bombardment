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
import { cn } from "@/lib/utils";
import useStore from "@/store";
import useAbilityDetails from "@/hooks/use-ability-details";
import useAbilities from "@/hooks/use-abilities";

interface AbilitiesProps {
  id: string;
  value: number;
  abilities?: Ability[];
  abilitiesInUse?: Ability[];
  betMade: boolean;
}

export default function Abilities({
  id,
  value,
  abilities,
  abilitiesInUse,
  betMade,
}: AbilitiesProps) {
  const { gameMode, deletePlayerAbility, addPlayerAbilityInUse } = useStore();
  const { getAbilityDetails } = useAbilityDetails();
  const { runLuckThief, runBalanceEqualizer } = useAbilities();

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

    addPlayerAbilityInUse(id, ability);
  };

  return (
    gameMode === GAME_MODES[1] && (
      <ul className="flex justify-center flex-wrap gap-[20px]">
        {ABILITIES.map(ability => {
          const details = getAbilityDetails(ability);
          const isAbilityAvailable = abilities?.includes(ability);
          const isAbilityInUse = abilitiesInUse?.includes(ability);

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
                          disabled={!isAbilityAvailable || betMade}
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
                            <span className="block font-medium text-destructive mt-[5px]">
                              It can only be used once!
                            </span>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleUseAbility(ability);
                            }}
                          >
                            Use
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
