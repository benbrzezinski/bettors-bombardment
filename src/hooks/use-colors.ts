import { useCallback, useState } from "react";
import { COLORS, type Color } from "@/constants";
import { getRandomInt } from "@/lib/utils";

const useColors = () => {
  const [colors, setColors] = useState<Color[]>([]);

  const generateRandomizedColors = useCallback(() => {
    const randomizedColors: Color[] = [];
    const randomIndexesOfSpecialColors: number[] = [];
    const instantZero = COLORS[0];
    const bigWin = COLORS[1];

    while (randomizedColors.length < 100) {
      const randomIndex = getRandomInt(0, COLORS.length - 1);
      const color = COLORS[randomIndex];
      if (color === instantZero || color === bigWin) continue;
      randomizedColors.push(color);
    }

    while (randomIndexesOfSpecialColors.length < 3) {
      const randomIndex = getRandomInt(0, 99);
      if (randomIndexesOfSpecialColors.includes(randomIndex)) continue;
      randomIndexesOfSpecialColors.push(randomIndex);
    }

    randomizedColors.splice(randomIndexesOfSpecialColors[0], 1, instantZero);
    randomizedColors.splice(randomIndexesOfSpecialColors[1], 1, bigWin);
    randomizedColors.splice(randomIndexesOfSpecialColors[2], 1, bigWin);

    setColors(randomizedColors);
  }, []);

  return { colors, generateRandomizedColors };
};

export default useColors;
