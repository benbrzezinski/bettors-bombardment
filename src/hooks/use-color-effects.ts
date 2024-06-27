import { useCallback, useState } from "react";
import { COLORS, type Color } from "@/constants";
import { getRandomInt } from "@/lib/utils";

const useColorEffects = () => {
  const [magicColors, setMagicColors] = useState<Color[]>([]);

  const generateRandomColors = useCallback(() => {
    const randomColors: Color[] = [];

    while (randomColors.length < 100) {
      const randomIndex = getRandomInt(0, COLORS.length - 1);
      const color = COLORS[randomIndex];
      const colorEndGame = COLORS[0];
      const colorBigWin = COLORS[1];

      if (
        (color === colorEndGame && randomColors.includes(colorEndGame)) ||
        (color === colorBigWin &&
          randomColors.filter(c => c === colorBigWin).length === 2)
      ) {
        continue;
      }

      randomColors.push(color);
    }

    setMagicColors(randomColors);
  }, []);

  return { magicColors, generateRandomColors };
};

export default useColorEffects;
