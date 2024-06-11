import GameName from "@/components/game-name";
import CardCustomize from "@/components/card-customize";
import CardInstructions from "@/components/card-instructions";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-[50px]">
      <GameName />
      <CardCustomize />
      <CardInstructions />
    </div>
  );
}
