import { TextRecord } from "../type.d";

export const townConvoRecord: TextRecord = {
  doctor: {
    init: {
      label:
        "Welcome, adventurer! You must be new. Would you like to learn about our town?",
      options: [
        {
          optionLabel: "Yes please!",
          next: "intro2",
        },
        {
          optionLabel: "No thanks",
          next: "farewell",
        },
      ],
    },
    intro2: {
      label:
        "Well in this world, the game Rock Paper Scissors (RPS) reigns supreme.",
      next: "intro3",
    },
    intro3: {
      label:
        "Collect unique gestures, challenge rivals, and compete in the RPS League. It's a simple game, but to master it is both art and strategy.",
      next: "selection",
    },
    selection: {
      label: "Is there anything else I can help you with?",
      options: [
        {
          optionLabel: "Where do I get the gestures?",
          next: "gestures",
        },
        {
          optionLabel: "No thanks",
          next: "farewell",
        },
      ],
    },
    gestures: {
      label:
        "Gestures are scattered across the land. You could find them everywhere.",
      next: "gestures2",
    },
    gestures2: {
      label: "Here is a few Rock gestures to get you started",
      next: "gestures3",
      itemAction: {
        type: "add",
        key: "gesture-rock",
        count: 4,
      },
      reachedPlotPoint: "collected-rock",
    },
    gestures3: {
      label:
        "Some of the towns folk might have some spares too. You should ask around.",
      next: "gestures4",
    },
    gestures4: {
      label:
        "I hear Jenny the shopkeeper, and the fisherman.... whatever his name is... have quite a few extra gestures.",
      next: "selection",
    },
    farewell: {
      label: "Alright, good luck!",
      next: null,
    },
  },
  fisherman: {
    init: {
      label: "Good morning, nice day for fishing ain't it?",
      options: [
        {
          optionLabel: "It sure is!",
          next: "farewell",
        },
        {
          optionLabel: "No, I don't think so",
          next: "farewell",
        },
        {
          optionLabel: "Do you have any spare gestures?",
          next: "farewell2",
          plotCondition: [
            { key: "collected-rock", status: true },
            { key: "collected-scissor", status: false },
          ],
        },
      ],
    },
    farewell: {
      label: "Henehn...(short laughter)",
      next: null,
    },
    farewell2: {
      label: "Henehn...(short laughter)",
      next: "farewell2_2",
    },
    farewell2_2: {
      label: "...",
      next: "farewell2_3",
    },
    farewell2_3: {
      label: "... ...",
      next: "farewell2_4",
    },
    farewell2_4: {
      label: "... ... ...",
      next: "farewell2_5",
    },
    farewell2_5: {
      label: "ok, here you go, henehn (short laughter)",
      next: null,
      itemAction: {
        type: "add",
        key: "gesture-scissors",
        count: 7,
      },
    },
  },
  shopkeeper: {
    init: {
      label: "Hello adventurer, are you looking to buy something?",
      options: [
        {
          optionLabel: "Thanks, but I'm okay for now.",
          next: "farewell",
        },
        {
          optionLabel: "No, but do you have any spare gestures?",
          next: "gesture",
          plotCondition: [
            { key: "collected-rock", status: true },
            { key: "collected-paper", status: false },
          ],
        },
      ],
    },
    gesture: {
      label: "Oh yea I do!",
      next: "gesture2",
    },
    gesture2: {
      label:
        "You know I dreamt of being a Rock Paper Scissors battler too when I was young",
      next: "gesture3",
    },
    gesture3: {
      label: "But I just couldn't get the hang of it.",
      next: "gesture4",
    },
    gesture4: {
      label:
        "Here are some paper gestures. Hope they serve you better than they've served me!",
      next: null,
      itemAction: {
        type: "add",
        key: "gesture-paper",
        count: 2,
      },
    },
    farewell: {
      label: "Ah alright. Well I'm here if you need me.",
      next: null,
    },
  },
};
