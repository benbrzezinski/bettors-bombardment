"use client";

import { Dispatch, SetStateAction } from "react";
import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PlayerData } from "@/components/card-customization";
import useTranslation from "@/store/use-translation";
import t from "@/translations";

interface PlayersDataProps {
  playersData: PlayerData[];
  setPlayersData: Dispatch<SetStateAction<PlayerData[]>>;
}

export default function PlayersData({
  playersData,
  setPlayersData,
}: PlayersDataProps) {
  const { lng } = useTranslation();

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const updatedPlayersData = playersData.map((playerData, i) =>
      i === index ? { ...playerData, [field]: value } : playerData
    );

    setPlayersData(updatedPlayersData);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <ul className="flex flex-col gap-[5px]">
        <li className="flex gap-[11px]">
          <span className="align-middle text-muted-foreground">*</span>
          <CardDescription>
            {t[lng].cardCustomization.conditions[0]}
          </CardDescription>
        </li>
        <li className="flex gap-[11px]">
          <span className="align-middle text-muted-foreground">*</span>
          <CardDescription>
            {t[lng].cardCustomization.conditions[1]}
          </CardDescription>
        </li>
        <li className="flex gap-[11px]">
          <span className="align-middle text-muted-foreground">*</span>
          <CardDescription>
            {t[lng].cardCustomization.conditions[2]}
          </CardDescription>
        </li>
      </ul>
      {playersData.map(({ name, value }, i) => (
        <div className="flex flex-col gap-[6px]" key={i}>
          <p className="text-lg mb-[4px]">{`${t[lng].bettor} ${i + 1}`}</p>
          <Label htmlFor={`player-${i}-name`}>
            {t[lng].cardCustomization.name}
          </Label>
          <Input
            type="text"
            id={`player-${i}-name`}
            name="name"
            value={name}
            placeholder={t[lng].cardCustomization.namePlaceholder}
            maxLength={15}
            autoComplete="off"
            onChange={e => {
              const value = e.target.value;
              if (value !== "" && !/^[a-z\s]+$/i.test(value)) return;
              handlePlayerChange(i, e.target.name, value);
            }}
          />
          <Label htmlFor={`player-${i}-value`}>{t[lng].balance}</Label>
          <Input
            type="text"
            id={`player-${i}-value`}
            name="value"
            inputMode="numeric"
            value={value}
            placeholder={t[lng].cardCustomization.balancePlaceholder}
            maxLength={7}
            autoComplete="off"
            onChange={e => {
              const value = e.target.value;
              if (value !== "" && !/^\d+$/.test(value)) return;
              handlePlayerChange(i, e.target.name, value);
            }}
          />
        </div>
      ))}
    </div>
  );
}
