"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { toast } from "@/components/ui/use-toast";
import SelectNumberOfPlayers from "@/components/select-number-of-players";
import PlayersData from "@/components/players-data";
import SelectAmountOfRounds from "@/components/select-amount-of-rounds";
import useStore from "@/store";

export interface PlayerData {
  name: string;
  value: string;
}

export default function CardCustomize() {
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const { numberOfPlayers, amountOfRounds, setPlayers } = useStore();
  const router = useRouter();

  useEffect(() => {
    setPlayersData(
      Array.from({ length: numberOfPlayers }, () => ({
        name: "",
        value: "1000",
      }))
    );
  }, [numberOfPlayers]);

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
    router.push(`/gameplay/${players[0].id}`);
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
          <SelectNumberOfPlayers />
          <PlayersData
            playersData={playersData}
            setPlayersData={setPlayersData}
          />
          <SelectAmountOfRounds />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={startGame}>Start the Game</Button>
      </CardFooter>
    </Card>
  );
}
