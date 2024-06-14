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
import { ABILITIES, type Ability } from "@/constants";
import useAbilities from "@/hooks/use-abilities";

interface AbilitiesProps {
  abilities?: Ability[];
}

export default function Abilities({ abilities }: AbilitiesProps) {
  const { getAbilityDetails } = useAbilities();

  return abilities ? (
    <ul className="flex gap-[20px] absolute translate-y-[-140%]">
      {ABILITIES.map(ability => {
        const details = getAbilityDetails(ability);

        return (
          <li key={ability}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="size-[50px] rounded-full p-0"
                  variant="outline"
                >
                  {details.icon}
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
                  <AlertDialogAction>Use</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        );
      })}
    </ul>
  ) : null;
}
