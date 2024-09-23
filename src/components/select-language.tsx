"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
              <Avatar className="size-[24px] rounded-none">
                <AvatarImage
                  src={`/assets/svgs/${lng}.svg`}
                  alt={lng}
                  loading="eager"
                />
                <AvatarFallback className="rounded-none" />
              </Avatar>
              <p>{lng.toLocaleUpperCase()}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
