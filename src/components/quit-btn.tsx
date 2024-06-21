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
import { Button, buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import useStore from "@/store";

export default function QuitBtn() {
  const { resetStore } = useStore();
  const router = useRouter();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 639px)" });

  const quitGame = () => {
    resetStore();
    router.replace("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="animate-fade-in opacity-0 pointer-events-none absolute top-[10px] right-[10px] sm:top-[15px] sm:right-[15px] px-[10px] sm:px-[16px]"
        >
          <LogOut className="sm:mr-[10px]" />
          {isSmallScreen ? "" : "Quit"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to quit the game?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently end the current
            game and delete all players and their data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={quitGame}
          >
            Quit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
