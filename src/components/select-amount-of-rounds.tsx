"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AMOUNT_OF_ROUNDS } from "@/constants";
import useStore from "@/store";

export default function SelectAmountOfRounds() {
  const { amountOfRounds, setAmountOfRounds } = useStore();

  return (
    <div className="flex flex-col gap-[6px]">
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
          {AMOUNT_OF_ROUNDS.map(n => (
            <SelectItem value={n.toString()} key={n}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
