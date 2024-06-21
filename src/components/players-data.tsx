"use client";

import { Dispatch, SetStateAction } from "react";
import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PlayerData } from "@/components/card-customize";
import type { NumberOfPlayers } from "@/constants";

interface PlayersDataProps {
  numberOfPlayers: 0 | NumberOfPlayers;
  playersData: PlayerData[];
  setPlayersData: Dispatch<SetStateAction<PlayerData[]>>;
}

export default function PlayersData({
  numberOfPlayers,
  playersData,
  setPlayersData,
}: PlayersDataProps) {
  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updatedPlayersData = playersData.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );

    setPlayersData(updatedPlayersData);
  };

  return numberOfPlayers ? (
    <div className="flex flex-col gap-[20px]">
      <ul className="flex flex-col gap-[5px]">
        <li className="flex gap-[11px]">
          <span className="align-middle text-muted-foreground">*</span>
          <CardDescription>
            Player names must be unique, regardless of case sensitive.
          </CardDescription>
        </li>
        <li className="flex gap-[11px]">
          <span className="align-middle text-muted-foreground">*</span>
          <CardDescription>
            Name can only contain basic letters [A-Z].
          </CardDescription>
        </li>
        <li className="flex gap-[11px]">
          <span className="align-middle text-muted-foreground">*</span>
          <CardDescription>
            Value can only contain digits and must be a positive integer.
          </CardDescription>
        </li>
      </ul>
      {playersData.map(({ name, value }, i) => (
        <div className="flex flex-col gap-[6px]" key={i}>
          <p className="text-lg mb-[4px]">Bettor {i + 1}</p>
          <Label htmlFor={`player-${i}-name`}>Name</Label>
          <Input
            type="text"
            id={`player-${i}-name`}
            name="name"
            value={name}
            placeholder="Nickname"
            maxLength={15}
            autoComplete="off"
            onChange={e => {
              const value = e.target.value;
              if (value !== "" && !/^[a-z\s]+$/i.test(value)) return;
              handlePlayerChange(i, e.target.name, value);
            }}
          />
          <Label htmlFor={`player-${i}-value`}>Balance</Label>
          <Input
            type="text"
            id={`player-${i}-value`}
            name="value"
            value={value}
            placeholder="Initial balance"
            maxLength={7}
            autoComplete="off"
            onChange={e => {
              const value = e.target.value;
              if (value !== "" && !/^\d+$/.test(value)) return;
              handlePlayerChange(i, e.target.name, value);
            }}
          />
        </div>
      ))}
    </div>
  ) : null;
}
