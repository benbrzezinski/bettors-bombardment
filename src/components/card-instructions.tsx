import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CardInstructions() {
  return (
    <Card className="w-full cursor-default">
      <CardHeader className="items-center">
        <CardTitle>Instructions</CardTitle>
        <CardDescription>Answers to fundamental questions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="objective">
            <AccordionTrigger>What is the objective?</AccordionTrigger>
            <AccordionContent>
              Increase your balance by placing bets and selecting hidden fields.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="gameplay">
            <AccordionTrigger>What is the gameplay like?</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-[10px] list-disc pl-[16px]">
                <li>
                  <p>Place bets on hidden fields.</p>
                </li>
                <li>
                  <p>Click on a field to reveal its effect.</p>
                </li>
                <li>
                  <p>Effects can either increase or decrease your balance.</p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="win">
            <AccordionTrigger>Who wins?</AccordionTrigger>
            <AccordionContent>
              The player with the highest balance at the end wins.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="lose">
            <AccordionTrigger>How can you lose?</AccordionTrigger>
            <AccordionContent>
              If your balance drops to zero, you are out of the game.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="game-modes">
            <AccordionTrigger>
              What do the different game modes involve?
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-[10px] list-disc pl-[16px]">
                <li>
                  <p>
                    <span className="font-medium">Normal</span> - Players play
                    in the standard way, without additional modifications or
                    special rules.
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-medium">Abilities</span> - Each player
                    has all the available abilities at their disposal.
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-medium">Randomized Abilities</span> -
                    Each player has 3 random abilities at their disposal.
                  </p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="justify-center">
        <p>Good luck, and play strategically!</p>
      </CardFooter>
    </Card>
  );
}
