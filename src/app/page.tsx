import GameName from "@/components/game-name";
import CardCustomization from "@/components/card-customization";
import CardInstructions from "@/components/card-instructions";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-[50px]">
      <GameName />
      <CardCustomization />
      <CardInstructions />
    </div>
  );
}
