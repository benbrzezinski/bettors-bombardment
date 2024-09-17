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
import { NUMBER_OF_PLAYERS, type NumberOfPlayers } from "@/constants";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

interface SelectNumberOfPlayersProps {
  numberOfPlayers: 0 | NumberOfPlayers;
  setNumberOfPlayers: Dispatch<SetStateAction<0 | NumberOfPlayers>>;
}

export default function SelectNumberOfPlayers({
  numberOfPlayers,
  setNumberOfPlayers,
}: SelectNumberOfPlayersProps) {
  const { lng } = useTranslation();

  return (
    <div className="flex flex-col gap-[6px]">
      <Label htmlFor="players">
        {t[lng].cardCustomization.numberOfPlayersLabel}
      </Label>
      <Select
        name="number-of-players"
        value={numberOfPlayers === 0 ? undefined : numberOfPlayers.toString()}
        onValueChange={value => {
          setNumberOfPlayers(parseInt(value) as NumberOfPlayers);
        }}
      >
        <SelectTrigger id="players">
          <SelectValue
            placeholder={t[lng].cardCustomization.selectPlaceholder}
          />
        </SelectTrigger>
        <SelectContent>
          {NUMBER_OF_PLAYERS.map(n => (
            <SelectItem value={n.toString()} key={n}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
