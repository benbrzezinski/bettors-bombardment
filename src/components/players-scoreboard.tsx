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

interface PlayersScoreboardProps {
  playersWithOptionalTies: PlayersWithOptionalTies[];
  rawTable?: boolean;
}

export default function PlayersScoreboard({
  playersWithOptionalTies,
  rawTable,
}: PlayersScoreboardProps) {
  return (
    playersWithOptionalTies.length > 0 && (
      <>
        {!rawTable && (
          <p className="font-bold text-3xl md:text-4xl cursor-default">
            Other Positions
          </p>
        )}
        <Table className="text-sm md:text-xl cursor-default">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-center">
                Position
              </TableHead>
              <TableHead className="font-semibold text-center">
                Bettor
              </TableHead>
              <TableHead className="font-semibold text-center">
                Balance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-medium text-center">
            {playersWithOptionalTies.map(({ players }, i) => (
              <TableRow key={i}>
                <TableCell>{rawTable ? i + 1 : i + 2}</TableCell>
                <TableCell className="flex flex-col items-center gap-[5px]">
                  {players.map(({ id, name }) => (
                    <p key={id}>{name}</p>
                  ))}
                </TableCell>
                <TableCell>
                  <p>{players.find(({ value }) => value !== 0)?.value}$</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  );
}
