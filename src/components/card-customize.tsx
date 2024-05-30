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
import { useToast } from "@/components/ui/use-toast";
import useStore from "@/store";

interface PlayerData {
  name: string;
  value: number;
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
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setPlayersData(
      Array.from({ length: numberOfPlayers }, () => ({ name: "", value: 100 }))
    );
  }, [numberOfPlayers]);

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updatedPlayersData = playersData.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );

    setPlayersData(updatedPlayersData);
  };

  const startGame = () => {
    if (!numberOfPlayers || !amountOfRounds || !playersData.length) {
      toast({
        duration: 8000,
        variant: "destructive",
        title: "Uh oh, something went wrong!",
        description: "All settings fields are required to start the game",
      });

      return;
    }

    const players = playersData.map(p => ({ ...p, id: nanoid() }));
    setPlayers(players);
    router.push(`/${players[0].id}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Customize Your Game</CardTitle>
        <CardDescription className="text-center">
          Set the desired settings in one-moment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-[30px]">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="players">Number of players</Label>
            <Select
              name="numberOfPlayers"
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
              {playersData.map(({ name, value }, i) => (
                <div className="flex flex-col gap-[6px]" key={i}>
                  <h3 className="text-lg mb-[4px]">Player {i + 1}</h3>
                  <Label htmlFor={`player-${i}-name`}>Name</Label>
                  <Input
                    type="text"
                    id={`player-${i}-name`}
                    name="name"
                    value={name}
                    placeholder="Nickname"
                    autoComplete="on"
                    onChange={e =>
                      handlePlayerChange(i, e.target.name, e.target.value)
                    }
                  />
                  <Label htmlFor={`player-${i}-value`}>Value</Label>
                  <Input
                    type="number"
                    id={`player-${i}-value`}
                    name="value"
                    value={value}
                    min={1}
                    placeholder="100"
                    autoComplete="on"
                    onChange={e =>
                      handlePlayerChange(i, e.target.name, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          ) : null}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="rounds">Amount of rounds</Label>
            <Select
              name="amountOfRounds"
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
        <Button onClick={startGame}>Start the game</Button>
      </CardFooter>
    </Card>
  );
}
