import { useCallback, useState } from "react";
import { COLORS, type Color } from "@/constants";

const useColorEffects = () => {
  const [magicColors, setMagicColors] = useState<Color[]>([]);

  const generateRandomColors = useCallback(() => {
    const randomColors: Color[] = [];

    while (randomColors.length < 100) {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
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
