"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useStore from "@/store";

export default function Multiplier() {
  const { currentRound } = useStore();

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
        <HoverCardContent>
          Multiplier that applies to all drawn numbers in this round.
        </HoverCardContent>
      </HoverCard>
      <div className="absolute top-[-8px] right-[-8px] size-[50px] border-t-2 border-r-2 border-red-700 rounded-tr-md pointer-events-none"></div>
    </>
  );
}
