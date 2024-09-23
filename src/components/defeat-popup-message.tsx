"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useStore, { type Player } from "@/store";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

interface DefeatPopupMessageProps {
  player: Player;
  nextPlayerExists: (skipLevel?: number) => Player | undefined;
}

export default function DefeatPopupMessage({
  player,
  nextPlayerExists,
}: DefeatPopupMessageProps) {
  const TIMEOUT_DELAY = 1000;
  const { players, amountOfRounds, currentRound, deletePlayer, nextRound } =
    useStore();
  const { lng } = useTranslation();
  const alertTriggerBtnRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const nextPlayer = nextPlayerExists();

  useEffect(() => {
    if (player.value === 0 && alertTriggerBtnRef.current) {
      const triggerBtn = alertTriggerBtnRef.current;

      const timeoutID = setTimeout(() => {
        triggerBtn.click();
      }, TIMEOUT_DELAY);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [player.value]);

  const handleAction = () => {
    deletePlayer(player.id);

    if (nextPlayer) {
      router.replace(`/gameplay/${nextPlayer.id}`);
    } else if (amountOfRounds > currentRound && players.length > 2) {
      nextRound();
      router.replace(`/gameplay/${players[0].id}`);
    } else {
      router.replace("/results");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="hidden absolute"
        ref={alertTriggerBtnRef}
      ></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive text-2xl">
            {t[lng].defeatPopupMessage.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t[lng].defeatPopupMessage.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAction}>
            <ChevronRight />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
