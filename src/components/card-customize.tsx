"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import useStore from "@/store";
import { toast } from "./ui/use-toast";

interface PlayerData {
  name: string;
  value: string;
}

export default function CardCustomize() {
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const {
    numberOfPlayers,
    amountOfRounds,
    setNumberOfPlayers,
    setAmountOfRounds,
    setPlayers,
  } = useStore();
  const router = useRouter();

  useEffect(() => {
    setPlayersData(
      Array.from({ length: numberOfPlayers }, () => ({
        name: "",
        value: "1000",
      }))
    );
  }, [numberOfPlayers]);

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updatedPlayersData = playersData.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );

    setPlayersData(updatedPlayersData);
  };

  const startGame = () => {
    const playerNames = playersData.map(({ name }) =>
      name.toLocaleLowerCase().trim()
    );

    const uniquePlayerNames = Array.from(new Set(playerNames));

    if (
      !numberOfPlayers ||
      !amountOfRounds ||
      !playersData.every(
        ({ name, value }) => name.trim() && value && !value.startsWith("0")
      ) ||
      playerNames.length !== uniquePlayerNames.length
    ) {
      toast({
        duration: 8000,
        variant: "destructive",
        title: "Uh, something went wrong!",
        description:
          "To start the game, all settings fields are required and must meet all the above conditions (*).",
      });

      return;
    }

    const players = playersData.map(p => ({
      id: nanoid(),
      name: p.name.trim(),
      value: parseInt(p.value),
    }));

    setPlayers(players);
    router.push(`/game/${players[0].id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader className="items-center">
        <CardTitle>Customize Your Game</CardTitle>
        <CardDescription>
          Set the desired settings in one-moment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-[30px]">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="players">Number of players</Label>
            <Select
              name="numberOfPlayers"
              value={
                numberOfPlayers.toString() === "0"
                  ? undefined
                  : numberOfPlayers.toString()
              }
              onValueChange={value => {
                setNumberOfPlayers(parseInt(value));
              }}
            >
              <SelectTrigger id="players">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {numberOfPlayers ? (
            <div className="flex flex-col gap-[20px]">
              <div>
                <CardDescription>
                  * Player names must be unique, regardless of case sensitive.
                </CardDescription>
                <CardDescription>
                  * Name can only contain basic letters [A-Z].
                </CardDescription>
                <CardDescription>
                  * Value can only contain digits and must be a positive
                  integer.
                </CardDescription>
              </div>
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
          ) : null}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="rounds">Amount of rounds</Label>
            <Select
              name="amountOfRounds"
              value={
                amountOfRounds.toString() === "0"
                  ? undefined
                  : amountOfRounds.toString()
              }
              onValueChange={value => {
                setAmountOfRounds(parseInt(value));
              }}
            >
              <SelectTrigger id="rounds">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={startGame}>Start the Game</Button>
      </CardFooter>
    </Card>
  );
}
