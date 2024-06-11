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

interface DefeatPopupMessageProps {
  player: Player;
  nextPlayer: Player | undefined;
}

export default function DefeatPopupMessage({
  player,
  nextPlayer,
}: DefeatPopupMessageProps) {
  const { players, amountOfRounds, currentRound, deletePlayer } = useStore();
  const alertTriggerBtnRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (player && player.value === 0 && alertTriggerBtnRef.current) {
      const triggerBtn = alertTriggerBtnRef.current;

      const timeoutID = setTimeout(() => {
        triggerBtn.click();
      }, 1000);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [player, player?.value]);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="hidden absolute"
        ref={alertTriggerBtnRef}
      ></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive text-2xl">
            You have just lost!
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your balance has been cleared. You have been removed from the game
            and you can no longer participate in this game, continue by clicking
            the button below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              deletePlayer(player.id);

              nextPlayer
                ? router.replace(`/gameplay/${nextPlayer.id}`)
                : amountOfRounds > currentRound && players.length > 1
                ? router.replace(`/gameplay/${players[0].id}`)
                : router.replace("/results");
            }}
          >
            <ChevronRight />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
