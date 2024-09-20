"use client";

import Lottie from "lottie-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import useTranslation from "@/store/use-translation";
import notFound from "@/lotties/not-found.json";
import t from "@/translations";

export default function PlayerNotFound() {
  const { resetStore } = useStore();
  const { lng } = useTranslation();
  const router = useRouter();

  const restartGame = () => {
    resetStore();
    router.replace("/");
  };

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <p className="text-center">{t[lng].playerNotFound.text}</p>
      <div className="size-[300px] relative">
        <Lottie
          animationData={notFound}
          loop={false}
          className="inset-0 absolute z-10"
        />
        <Skeleton className="size-[250px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full" />
      </div>
      <Button onClick={restartGame}>{t[lng].playerNotFound.restart}</Button>
    </div>
  );
}
