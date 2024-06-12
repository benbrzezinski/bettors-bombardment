"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { GAME_MODES, type GameMode } from "@/constants";

interface SelectGameModeProps {
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
}

export default function SelectGameMode({
  gameMode,
  setGameMode,
}: SelectGameModeProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <Label htmlFor="mode">Game mode</Label>
      <Select
        name="game-mode"
        value={gameMode}
        onValueChange={value => {
          setGameMode(value as GameMode);
        }}
      >
        <SelectTrigger id="mode">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          {GAME_MODES.map(mode => (
            <SelectItem value={mode} key={mode}>
              {mode}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
