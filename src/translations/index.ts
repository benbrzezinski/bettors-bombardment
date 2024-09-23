const t = {
  en: {
    bettor: "Bettor",
    balance: "Balance",
    cancel: "Cancel",
    cardCustomization: {
      title: "Customize Your Game",
      description: "Set your preferences in one moment.",
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
    gameInfo: {
      round: "Round",
      bet: "Bet too large",
    },
    betValueInput: {
      placeholder: "Value to bet",
      submit: "Submit",
      max: "Max",
      reset: "Reset",
    },
    multiplier: {
      content: "Multiplier that applies to all drawn effects in this round.",
    },
    gameplayActionBtn: {
      nextBettor: "Next Bettor",
      nextRound: "Next Round",
      seeResults: "See Results",
    },
    abilitiesMenu: {
      title: "Abilities",
      description:
        "Each ability can only be used once. Abilities related to hidden fields cannot be used after making a move.",
    },
    abilities: {
      timeWarpLabels: [
        "Balance status before last change:",
        "Balance status is unchanged.",
      ],
      note: "It can only be used once!",
      action: "Use",
    },
    abilityDetails: {
      luckTrial: {
        title: "Luck Trial",
        description:
          "Your next drawn effect is multiplied by 10, whether it is positive or negative.",
      },
      secondChance: {
        title: "Second Chance",
        description:
          "You are protected from being zeroed out, but when this happens, your balance will be halved.",
      },
      turnStealer: {
        title: "Turn Stealer",
        description:
          "The next player loses his turn. If this is used at the end of a round, the first player of the next round is skipped, if any.",
      },
      luckThief: {
        title: "Luck Thief",
        description:
          "Steal 10% of the balance from the player who currently has the highest balance.",
      },
      doubleTrouble: {
        title: "Double Trouble",
        description:
          "The effect of the next field you reveal is applied twice, whether it is positive or negative.",
      },
      balanceEqualizer: {
        title: "Balance Equalizer",
        description:
          "Equalize your balance with the player who currently has the closest balance to yours.",
      },
      sneakPeek: {
        title: "Sneak Peek",
        description:
          "Check the three hidden fields of your choice to see if the effect underneath them is positive (green border) or negative (red border).",
      },
      balanceBooster: {
        title: "Balance Booster",
        description:
          "Instantly increase your balance by a random amount between 10% and 50% of your current balance.",
      },
      timeWarp: {
        title: "Time Warp",
        description: "Undo the last balance change.",
      },
    },
    realTimePlayersScoreboardMenu: {
      title: "Scoreboard",
      description:
        "Displays the current state of the game. Updates are made in real-time.",
    },
    playersScoreboard: {
      label: "Other Positions",
      position: "Position",
    },
    defeatPopupMessage: {
      title: "You lost",
      description:
        "Your balance has been cleared, and you have been removed from the game. To continue, click the button below.",
    },
    quitBtn: {
      title: "Do you want to quit the game?",
      description:
        "This action cannot be undone. It will permanently end the current game and delete all players and their scores.",
      action: "Quit",
    },
    playerNotFound: {
      text: "Bettor not found. Please start the game again.",
      restart: "Restart",
    },
    winners: {
      winTitles: {
        singular: "Winner",
        plural: "Winners",
      },
      loseTitle: "Everyone lost",
    },
    newGameBtn: {
      text: "New game",
    },
  },
  pl: {
    bettor: "Gracz",
    balance: "Saldo",
    cancel: "Anuluj",
    cardCustomization: {
      title: "Dostosuj Swoją Grę",
      description: "Ustaw swoje preferencje w jednej chwili.",
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
    gameInfo: {
      round: "Runda",
      bet: "Za duży zakład",
    },
    betValueInput: {
      placeholder: "Wartość zakładu",
      submit: "Zatwierdź",
      max: "Maks",
      reset: "Zresetuj",
    },
    multiplier: {
      content:
        "Mnożnik stosowany do wszystkich wylosowanych efektów w tej rundzie.",
    },
    gameplayActionBtn: {
      nextBettor: "Następny Gracz",
      nextRound: "Następna Runda",
      seeResults: "Zobacz Wyniki",
    },
    abilitiesMenu: {
      title: "Zdolności",
      description:
        "Każda zdolność może być użyta tylko raz. Zdolności związane z ukrytymi polami nie mogą być użyte po wykonaniu ruchu.",
    },
    abilities: {
      timeWarpLabels: [
        "Stan salda przed ostatnią zmianą:",
        "Stan salda jest niezmieniony.",
      ],
      note: "Może być użyte tylko raz!",
      action: "Użyj",
    },
    abilityDetails: {
      luckTrial: {
        title: "Próba Szczęścia",
        description:
          "Twój następny wylosowany efekt zostanie pomnożony przez 10, bez względu na to, czy jest pozytywny, czy negatywny.",
      },
      secondChance: {
        title: "Druga Szansa",
        description:
          "Jesteś chroniony przed wyzerowaniem, ale gdy to nastąpi, twoje saldo zostanie zmniejszone o połowę.",
      },
      turnStealer: {
        title: "Kradzież Tury",
        description:
          "Następny gracz traci swoją turę. Jeśli zostanie użyte na końcu rundy, pierwszy gracz w następnej rundzie zostanie pominięty, jeśli taki istnieje.",
      },
      luckThief: {
        title: "Złodziej Szczęścia",
        description:
          "Skradnij 10% salda gracza, który ma obecnie największe saldo.",
      },
      doubleTrouble: {
        title: "Podwójne Kłopoty",
        description:
          "Efekt następnego pola, które odkryjesz, zostanie zastosowany dwukrotnie, niezależnie od tego, czy jest pozytywny, czy negatywny.",
      },
      balanceEqualizer: {
        title: "Wyrównywacz Salda",
        description:
          "Wyrównaj swoje saldo z graczem, który ma obecnie saldo najbliższe twojemu.",
      },
      sneakPeek: {
        title: "Wstępny Wgląd",
        description:
          "Sprawdź trzy wybrane ukryte pola, aby zobaczyć, czy efekt znajdujący się pod nimi jest pozytywny (zielona ramka), czy negatywny (czerwona ramka).",
      },
      balanceBooster: {
        title: "Dopalacz Salda",
        description:
          "Natychmiast zwiększ swoje saldo o losową wartość od 10% do 50% twojego obecnego salda.",
      },
      timeWarp: {
        title: "Zakrzywienie Czasu",
        description: "Cofnij ostatnią zmianę salda.",
      },
    },
    realTimePlayersScoreboardMenu: {
      title: "Tablica Wyników",
      description:
        "Pokazuje aktualny stan rozgrywki. Aktualizacje są dokonywane w czasie rzeczywistym.",
    },
    playersScoreboard: {
      label: "Kolejne Pozycje",
      position: "Pozycja",
    },
    defeatPopupMessage: {
      title: "Przegrałeś",
      description:
        "Twoje saldo zostało wyzerowane, a ty zostałeś usunięty z gry. Aby kontynuować, kliknij przycisk poniżej.",
    },
    quitBtn: {
      title: "Czy chcesz wyjść z gry?",
      description:
        "Tej akcji nie można cofnąć. Trwale zakończy to bieżącą grę oraz usunie wszystkich graczy i ich wyniki.",
      action: "Wyjdź",
    },
    playerNotFound: {
      text: "Nie znaleziono gracza. Proszę rozpocząć grę ponownie.",
      restart: "Uruchom ponownie",
    },
    winners: {
      winTitles: {
        singular: "Zwycięzca",
        plural: "Zwycięzcy",
      },
      loseTitle: "Wszyscy przegrali",
    },
    newGameBtn: {
      text: "Nowa gra",
    },
  },
} as const;

export default t;
