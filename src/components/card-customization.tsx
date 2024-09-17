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
  LANGUAGES,
  type NumberOfPlayers,
  type Ability,
} from "@/constants";
import SelectLanguage from "@/components/select-language";
import SelectNumberOfPlayers from "@/components/select-number-of-players";
import PlayersData from "@/components/players-data";
import SelectAmountOfRounds from "@/components/select-amount-of-rounds";
import SelectGameMode from "@/components/select-game-mode";
import useStore, { type Player } from "@/store";
import useTranslation from "@/store/use-translation";
import useAbilities from "@/hooks/use-abilities";
import t from "@/translations";

export interface PlayerData {
  name: string;
  value: string;
}

export default function CardCustomization() {
  const [numberOfPlayers, setNumberOfPlayers] = useState<0 | NumberOfPlayers>(
    0
  );
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const { amountOfRounds, gameMode, setPlayers } = useStore();
  const { generateRandomizedAbilities } = useAbilities();
  const { lng } = useTranslation();
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
      if (lng === LANGUAGES[0]) {
        toast({
          duration: 8000,
          variant: "destructive",
          title: "Uh, something went wrong!",
          description:
            "To start the game, all settings fields must be filled in and all of the above conditions must be met (*).",
        });
      } else {
        toast({
          duration: 8000,
          variant: "destructive",
          title: "Oj, coś poszło nie tak!",
          description:
            "Aby rozpocząć grę, wszystkie pola ustawień muszą być wypełnione oraz wszystkie powyższe warunki muszą być spełnione (*).",
        });
      }

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
            abilities: generateRandomizedAbilities(),
            abilitiesInUse: [] as Ability[],
          }));

    setPlayers(players);
    router.replace(`/gameplay/${players[0].id}`);
  };

  return (
    <Card className="w-full cursor-default">
      <div className="flex justify-center p-6 pb-0">
        <SelectLanguage />
      </div>
      <CardHeader className="items-center">
        <CardTitle className="text-[22px] xs:text-2xl">
          {t[lng].cardCustomization.title}
        </CardTitle>
        <CardDescription className="text-xs xs:text-sm">
          {t[lng].cardCustomization.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-[30px]">
          <SelectNumberOfPlayers
            numberOfPlayers={numberOfPlayers}
            setNumberOfPlayers={setNumberOfPlayers}
          />
          {numberOfPlayers ? (
            <PlayersData
              playersData={playersData}
              setPlayersData={setPlayersData}
            />
          ) : null}
          <SelectAmountOfRounds />
          <SelectGameMode />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={startGame}>{t[lng].cardCustomization.startBtn}</Button>
      </CardFooter>
    </Card>
  );
}
