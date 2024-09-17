import GameName from "@/components/game-name";
import CardCustomization from "@/components/card-customization";
import CardInstruction from "@/components/card-instruction";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-[50px]">
      <GameName />
      <CardCustomization />
      <CardInstruction />
    </div>
  );
}
