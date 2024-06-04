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

export default function Results() {
  const { players, resetStore } = useStore();
  const router = useRouter();

  const sortedPlayers = [...players].sort((a, b) => b.value - a.value);
  const winner = sortedPlayers[0];
  const remainingPlayers = sortedPlayers.slice(1, sortedPlayers.length);

  return (
    <div className="flex flex-col items-center gap-[50px]">
      <div className="text-lg md:text-2xl text-center font-bold">
        <p className="text-3xl md:text-4xl">Winner</p>
        <Lottie
          animationData={crown}
          className="size-[200px] drop-shadow-[0_0_0.75rem_gold]"
        />
        <p className="select-none mb-[2px]">{winner.name}</p>
        <p className="select-none">{winner.value}$</p>
      </div>
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
            <TableBody className="text-center font-medium">
              {remainingPlayers.map((player, i) => (
                <TableRow key={player.id}>
                  <TableCell>{i + 2}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.value}$</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <Button
        className="text-sm md:text-lg md:h-full"
        onClick={() => {
          resetStore();
          router.replace("/");
        }}
      >
        New Game
      </Button>
    </div>
  );
}
