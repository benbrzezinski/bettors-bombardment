const t = {
  en: {
    bettor: "Bettor",
    balance: "Balance",
    cardCustomization: {
      title: "Customize Your Game",
      description: "Set the desired settings in one-moment.",
      numberOfPlayersLabel: "Number of players",
      selectPlaceholder: "Select",
      conditions: [
        "Player names must be unique, regardless of case sensitive.",
        "Names can only contain basic letters [a-z].",
        "Balance can only contain digits and must be a positive integer.",
      ],
      name: "Name",
      namePlaceholder: "Nickname",
      balancePlaceholder: "Initial balance",
      amountOfRoundsLabel: "Amount of rounds",
      gameMode: "Game mode",
      startBtn: "Start the game",
    },
    cardInstruction: {
      title: "Instruction",
      description: "Answers to fundamental questions.",
      questions: {
        objective: "What is the objective?",
        gameplay: "What is the gameplay like?",
        win: "Who wins?",
        lose: "How can you lose?",
        gameModes: "What do the different game modes involve?",
      },
      answers: {
        objective:
          "Increase your balance by placing bets and selecting hidden fields.",
        gameplay: [
          "Place bets on hidden fields.",
          "Click on a field to reveal its effect.",
          "Effects can either increase or decrease your balance.",
        ],
        win: "The player with the highest balance at the end wins.",
        lose: "If your balance drops to zero, you are out of the game.",
        gameModes: [
          [
            "Normal",
            "Players play in the standard way, without additional modifications or special rules.",
          ],
          [
            "Abilities",
            "Each player has all the available abilities at their disposal.",
          ],
          [
            "Randomized Abilities",
            "Each player has 3 random abilities at their disposal.",
          ],
        ],
      },
      footerText: "Good luck, and play strategically!",
    },
    gameInfo: {},
  },
  pl: {
    bettor: "Gracz",
    balance: "Saldo",
    cardCustomization: {
      title: "Dostosuj Swoją Grę",
      description: "Ustaw pożądane opcje w mgnieniu oka.",
      numberOfPlayersLabel: "Liczba graczy",
      selectPlaceholder: "Wybierz",
      conditions: [
        "Nazwy graczy muszą być unikalne, niezależnie od wielkości liter.",
        "Nazwy mogą zawierać wyłącznie podstawowe litery [a-z].",
        "Saldo może zawierać tylko cyfry i musi być dodatnią liczbą całkowitą.",
      ],
      name: "Nazwa",
      namePlaceholder: "Pseudonim",
      balancePlaceholder: "Saldo początkowe",
      amountOfRoundsLabel: "Ilość rund",
      gameMode: "Tryb gry",
      startBtn: "Rozpocznij grę",
    },
    cardInstruction: {
      title: "Instrukcja",
      description: "Odpowiedzi na fundamentalne pytania.",
      questions: {
        objective: "Jaki jest cel gry?",
        gameplay: "Jak wygląda rozgrywka?",
        win: "Kto wygrywa?",
        lose: "Jak można przegrać?",
        gameModes: "Na czym polegają różne tryby gry?",
      },
      answers: {
        objective:
          "Zwiększ swoje saldo, obstawiając zakłady i wybierając ukryte pola.",
        gameplay: [
          "Obstawiaj zakłady na ukryte pola.",
          "Kliknij na pole, aby odkryć jego efekt.",
          "Efekty mogą zwiększyć lub zmniejszyć twoje saldo.",
        ],
        win: "Gracz z najwyższym saldem na końcu wygrywa.",
        lose: "Jeśli twoje saldo spadnie do zera, odpadasz z gry.",
        gameModes: [
          [
            "Normalny",
            "Gracze grają w standardowy sposób, bez dodatkowych modyfikacji lub specjalnych zasad.",
          ],
          [
            "Zdolności",
            "Każdy gracz ma do dyspozycji wszystkie dostępne zdolności.",
          ],
          [
            "Losowe Zdolności",
            "Każdy gracz ma do dyspozycji 3 losowe zdolności.",
          ],
        ],
      },
      footerText: "Powodzenia i graj z rozwagą!",
    },
  },
} as const;

export default t;
