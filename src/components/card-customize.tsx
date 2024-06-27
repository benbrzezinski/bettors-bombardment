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
import {
  GAME_MODES,
  ABILITIES,
  type NumberOfPlayers,
  type Ability,
} from "@/constants";
import SelectNumberOfPlayers from "@/components/select-number-of-players";
import PlayersData from "@/components/players-data";
import SelectAmountOfRounds from "@/components/select-amount-of-rounds";
import SelectGameMode from "@/components/select-game-mode";
import useStore, { type Player } from "@/store";
import useAbilities from "@/hooks/use-abilities";

export interface PlayerData {
  name: string;
  value: string;
}

export default function CardCustomize() {
  const [numberOfPlayers, setNumberOfPlayers] = useState<0 | NumberOfPlayers>(
    0
  );
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const { amountOfRounds, gameMode, setPlayers } = useStore();
  const { getRandomizedAbilities } = useAbilities();
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

    const players: Player[] =
      gameMode === GAME_MODES[0]
        ? playersData.map(data => ({
            id: nanoid(),
            name: data.name.trim(),
            value: parseInt(data.value),
          }))
        : gameMode === GAME_MODES[1]
        ? playersData.map(data => ({
            id: nanoid(),
            name: data.name.trim(),
            value: parseInt(data.value),
            abilities: [...ABILITIES],
            abilitiesInUse: [] as Ability[],
          }))
        : playersData.map(data => ({
            id: nanoid(),
            name: data.name.trim(),
            value: parseInt(data.value),
            abilities: getRandomizedAbilities(),
            abilitiesInUse: [] as Ability[],
          }));

    setPlayers(players);
    router.replace(`/gameplay/${players[0].id}`);
  };

  return (
    <Card className="w-full cursor-default">
      <CardHeader className="items-center">
        <CardTitle>Customize Your Game</CardTitle>
        <CardDescription>
          Set the desired settings in one-moment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-[30px]">
          <SelectNumberOfPlayers
            numberOfPlayers={numberOfPlayers}
            setNumberOfPlayers={setNumberOfPlayers}
          />
          <PlayersData
            numberOfPlayers={numberOfPlayers}
            playersData={playersData}
            setPlayersData={setPlayersData}
          />
          <SelectAmountOfRounds />
          <SelectGameMode />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={startGame}>Start the Game</Button>
      </CardFooter>
    </Card>
  );
}
