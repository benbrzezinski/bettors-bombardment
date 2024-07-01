import { useCallback, useState } from "react";
import { COLORS, type Color } from "@/constants";
import { getRandomInt } from "@/lib/utils";

const useColorEffects = () => {
  const [magicColors, setMagicColors] = useState<Color[]>([]);

  const generateRandomizedColors = useCallback(() => {
    const randomColors: Color[] = [];
    const randomIndexesOfSpecialColors: number[] = [];
    const instantZero = COLORS[0];
    const bigWin = COLORS[1];

    while (randomColors.length < 100) {
      const randomIndex = getRandomInt(0, COLORS.length - 1);
      const color = COLORS[randomIndex];
      if (color === instantZero || color === bigWin) continue;
      randomColors.push(color);
    }

    while (randomIndexesOfSpecialColors.length < 3) {
      const randomIndex = getRandomInt(0, 99);
      if (randomIndexesOfSpecialColors.includes(randomIndex)) continue;
      randomIndexesOfSpecialColors.push(randomIndex);
    }

    randomColors.splice(randomIndexesOfSpecialColors[0], 1, instantZero);
    randomColors.splice(randomIndexesOfSpecialColors[1], 1, bigWin);
    randomColors.splice(randomIndexesOfSpecialColors[2], 1, bigWin);

    setMagicColors(randomColors);
  }, []);

  return { magicColors, generateRandomizedColors };
};

export default useColorEffects;
