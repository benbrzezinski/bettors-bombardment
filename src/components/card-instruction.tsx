"use client";

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
import useTranslation from "@/store/use-translation";
import t from "@/translations";

export default function CardInstruction() {
  const { lng } = useTranslation();

  return (
    <Card className="w-full cursor-default">
      <CardHeader className="items-center">
        <CardTitle className="text-[22px] xs:text-2xl">
          {t[lng].cardInstruction.title}
        </CardTitle>
        <CardDescription className="text-[12px] xs:text-sm">
          {t[lng].cardInstruction.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="objective">
            <AccordionTrigger>
              {t[lng].cardInstruction.questions.objective}
            </AccordionTrigger>
            <AccordionContent>
              {t[lng].cardInstruction.answers.objective}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="gameplay">
            <AccordionTrigger>
              {t[lng].cardInstruction.questions.gameplay}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-[10px] list-disc pl-[16px]">
                <li>
                  <p>{t[lng].cardInstruction.answers.gameplay[0]}</p>
                </li>
                <li>
                  <p>{t[lng].cardInstruction.answers.gameplay[1]}</p>
                </li>
                <li>
                  <p>{t[lng].cardInstruction.answers.gameplay[2]}</p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="win">
            <AccordionTrigger>
              {t[lng].cardInstruction.questions.win}
            </AccordionTrigger>
            <AccordionContent>
              {t[lng].cardInstruction.answers.win}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="lose">
            <AccordionTrigger>
              {t[lng].cardInstruction.questions.lose}
            </AccordionTrigger>
            <AccordionContent>
              {t[lng].cardInstruction.answers.lose}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="game-modes">
            <AccordionTrigger>
              {t[lng].cardInstruction.questions.gameModes}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-[10px] list-disc pl-[16px]">
                <li>
                  <p>
                    <span className="font-medium">
                      {t[lng].cardInstruction.answers.gameModes[0][0]}
                    </span>{" "}
                    - {t[lng].cardInstruction.answers.gameModes[0][1]}
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-medium">
                      {t[lng].cardInstruction.answers.gameModes[1][0]}
                    </span>{" "}
                    - {t[lng].cardInstruction.answers.gameModes[1][1]}
                  </p>
                </li>
                <li>
                  <p>
                    <span className="font-medium">
                      {t[lng].cardInstruction.answers.gameModes[2][0]}
                    </span>{" "}
                    - {t[lng].cardInstruction.answers.gameModes[2][1]}
                  </p>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-[15px] xs:text-base">
          {t[lng].cardInstruction.footerText}
        </p>
      </CardFooter>
    </Card>
  );
}
