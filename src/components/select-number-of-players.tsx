"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { NUMBER_OF_PLAYERS } from "@/constants";
import useStore from "@/store";

export default function SelectNumberOfPlayers() {
  const { numberOfPlayers, setNumberOfPlayers } = useStore();

  return (
    <div className="flex flex-col gap-[6px]">
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
