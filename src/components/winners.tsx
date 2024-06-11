"use client";

import Lottie from "lottie-react";
import type { Player } from "@/store";
import { cn } from "@/lib/utils";
import crown from "@/lotties/crown.json";

interface WinnersProps {
  winners: Player[];
}

export default function Winners({ winners }: WinnersProps) {
  return winners.length > 0 ? (
    <div className="flex flex-col items-center font-bold text-center">
      <p className="text-3xl md:text-4xl">
        {winners.length === 1 ? "Winner" : "Winners"}
      </p>
      <Lottie
        animationData={crown}
        className="size-[200px] drop-shadow-[0_0_0.75rem_gold]"
      />
      <div className="flex flex-col gap-[5px]">
        {winners.map(({ id, name }, i) => (
          <p
            className={cn(
              "text-lg md:text-2xl select-none px-[15px] break-all",
              i === winners.length - 1 && "border-b border-secondary pb-[15px]"
            )}
            key={id}
          >
            {name}
          </p>
        ))}
        <p className="text-lg md:text-2xl select-none border-b border-secondary pt-[20px] px-[15px] pb-[15px] break-all">
          {winners[0].value}$
        </p>
      </div>
    </div>
  ) : (
    <p className="text-3xl md:text-4xl font-bold text-center text-destructive">
      Everyone lost
    </p>
  );
}
