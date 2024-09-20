"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useStore from "@/store";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

export default function Multiplier() {
  const { currentRound } = useStore();
  const { lng } = useTranslation();

  return (
    <>
      <HoverCard openDelay={150}>
        <HoverCardTrigger asChild>
          <p
            className="absolute top-[-45px] right-[-15px] md:right-[-42px] text-3xl font-bold text-red-700 cursor-pointer"
            tabIndex={0}
          >
            {currentRound}x
          </p>
        </HoverCardTrigger>
        <HoverCardContent side="right">
          {t[lng].multiplier.content}
        </HoverCardContent>
      </HoverCard>
      <div className="absolute top-[-8px] right-[-8px] size-[50px] border-t-2 border-r-2 border-red-700 rounded-tr-md pointer-events-none"></div>
    </>
  );
}
