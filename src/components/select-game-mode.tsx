"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  GAME_MODES,
  GAME_MODES_PL,
  LANGUAGES,
  type GameMode,
} from "@/constants";
import useStore from "@/store";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

export default function SelectGameMode() {
  const { gameMode, setGameMode } = useStore();
  const { lng } = useTranslation();

  return (
    <div className="flex flex-col gap-[6px]">
      <Label htmlFor="mode">{t[lng].cardCustomization.gameMode}</Label>
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
        <SelectContent>
          {lng === LANGUAGES[0]
            ? GAME_MODES.map(mode => (
                <SelectItem value={mode} key={mode}>
                  {mode}
                </SelectItem>
              ))
            : GAME_MODES.map((mode, i) => (
                <SelectItem value={mode} key={mode}>
                  {GAME_MODES_PL[i]}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </div>
  );
}
