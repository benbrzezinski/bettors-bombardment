"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES, type Language } from "@/constants";
import useTranslation from "@/store/use-translation";

export default function SelectLanguage() {
  const { lng, setLng } = useTranslation();

  return (
    <Select
      name="lng"
      value={lng}
      onValueChange={value => {
        setLng(value as Language);
      }}
    >
      <SelectTrigger id="languages" className="w-[104px] h-auto border-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map(lng => (
          <SelectItem value={lng} key={lng}>
            <div className="flex items-center gap-[8px]">
              <div
                className="w-[24px] h-[18px] bg-no-repeat bg-center bg-contain bg-white/30"
                style={{ backgroundImage: `url(/assets/svgs/${lng}.svg)` }}
              />

              <p>{lng.toLocaleUpperCase()}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
