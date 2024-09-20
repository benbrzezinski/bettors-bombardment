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
import useTranslation from "@/store/use-translation";
import t from "@/translations";

export default function QuitBtn() {
  const { resetStore } = useStore();
  const { lng } = useTranslation();
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
          {isSmallScreen ? "" : t[lng].quitBtn.action}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t[lng].quitBtn.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {t[lng].quitBtn.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t[lng].cancel}</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={quitGame}
          >
            {t[lng].quitBtn.action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
