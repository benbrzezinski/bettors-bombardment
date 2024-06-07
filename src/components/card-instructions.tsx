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
    <Card className="w-full">
      <CardHeader className="items-center">
        <CardTitle>Instructions</CardTitle>
        <CardDescription>Answers to fundamental questions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the objective?</AccordionTrigger>
            <AccordionContent>
              Increase your balance by placing bets and selecting hidden fields.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
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
          <AccordionItem value="item-3">
            <AccordionTrigger>Who wins?</AccordionTrigger>
            <AccordionContent>
              The player with the highest balance at the end wins.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How can you lose?</AccordionTrigger>
            <AccordionContent>
              If your balance drops to zero, you are out of the game.
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
