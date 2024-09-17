"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AMOUNT_OF_ROUNDS, type AmountOfRounds } from "@/constants";
import useStore from "@/store";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

export default function SelectAmountOfRounds() {
  const { amountOfRounds, setAmountOfRounds } = useStore();
  const { lng } = useTranslation();

  return (
    <div className="flex flex-col gap-[6px]">
      <Label htmlFor="rounds">
        {t[lng].cardCustomization.amountOfRoundsLabel}
      </Label>
      <Select
        name="amount-of-rounds"
        value={amountOfRounds === 0 ? undefined : amountOfRounds.toString()}
        onValueChange={value => {
          setAmountOfRounds(parseInt(value) as AmountOfRounds);
        }}
      >
        <SelectTrigger id="rounds">
          <SelectValue
            placeholder={t[lng].cardCustomization.selectPlaceholder}
          />
        </SelectTrigger>
        <SelectContent>
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
