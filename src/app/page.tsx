import CardCustomize from "@/components/card-customize";
import CardInstructions from "@/components/card-instructions";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-[50px]">
      <h1 className="text-4xl text-center sm:text-5xl font-medium">
        Bettors Bombardment
      </h1>
      <CardCustomize />
      <CardInstructions />
    </div>
  );
}
