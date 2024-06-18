"use client";

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
import useAbilities from "@/hooks/use-abilities";

interface AbilitiesProps {
  id: string;
  abilities?: Ability[];
  abilitiesInUse?: Ability[];
  betMade: boolean;
}

export default function Abilities({
  id,
  abilities,
  abilitiesInUse,
  betMade,
}: AbilitiesProps) {
  const { gameMode, deletePlayerAbility, addPlayerAbilityInUse } = useStore();
  const { getAbilityDetails } = useAbilities();

  const handleUseAbility = (ability: Ability) => {
    deletePlayerAbility(id, ability);
    addPlayerAbilityInUse(id, ability);
  };

  return gameMode === GAME_MODES[1] ? (
    <ul className="flex gap-[20px] absolute translate-y-[-140%]">
      {ABILITIES.map(ability => {
        const details = getAbilityDetails(ability);
        const isAbilityAvailable = abilities?.includes(ability);
        const isAbilityInUse = abilitiesInUse?.includes(ability);

        return (
          <li key={ability}>
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
        );
      })}
    </ul>
  ) : null;
}
