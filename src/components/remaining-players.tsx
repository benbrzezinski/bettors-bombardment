"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PlayersWithOptionalTies } from "@/lib/utils";

interface RemainingPlayersProps {
  remainingPlayers: PlayersWithOptionalTies[];
}

export default function RemainingPlayers({
  remainingPlayers,
}: RemainingPlayersProps) {
  return (
    remainingPlayers.length > 0 && (
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
                  <p>{players.filter(({ value }) => value !== 0)[0].value}$</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  );
}
