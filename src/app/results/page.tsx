"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import useStore from "@/store";
import crown from "@/lotties/crown.json";
import { cn, groupPlayersIfTheyAreTied } from "@/lib/utils";

export default function Results() {
  const { players, resetStore } = useStore();
  const router = useRouter();

  const sortedPlayers = [...players].sort((a, b) => b.value - a.value);
  const winners = sortedPlayers.filter(
    p => p.value === sortedPlayers.at(0)?.value
  );
  const remainingPlayers = groupPlayersIfTheyAreTied(
    sortedPlayers.slice(winners.length)
  );

  const newGame = () => {
    resetStore();
    router.replace("/");
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-[100px]",
        winners.length === 0 && "gap-[50px]"
      )}
    >
      {winners.length > 0 ? (
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
                  i === winners.length - 1 &&
                    "border-b border-secondary pb-[15px]"
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
      )}
      <div className="flex flex-col items-center gap-[50px]">
        {remainingPlayers.length > 0 && (
          <>
            <p className="font-bold text-3xl md:text-4xl">Other Positions</p>
            <Table className="text-sm md:text-xl select-none">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center font-semibold">
                    Position
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Bettor
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Balance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center font-medium break-all">
                {remainingPlayers.map(({ players }, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 2}</TableCell>
                    <TableCell className="flex flex-col items-center gap-[5px]">
                      {players.map(({ id, name }) => (
                        <p key={id}>{name}</p>
                      ))}
                    </TableCell>
                    <TableCell>
                      <p>
                        {players.filter(({ value }) => value !== 0)[0].value}$
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
        <Button className="text-sm md:text-lg md:h-full" onClick={newGame}>
          New Game
        </Button>
      </div>
    </div>
  );
}
