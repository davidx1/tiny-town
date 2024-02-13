import { TextRecord } from "../type.d";

export const townConvoRecord: TextRecord = {
  introduction: {
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
      label:
        "Some of the towns folk might have some spares too if you help them with their day.",
      next: "gestures3",
    },
    gestures3: {
      label:
        "I hear Jenny the shopkeeper have quite a few PAPER gestures, you should talk to her.",
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
      ],
    },
    farewell: {
      label: "Henehn...(short laughter)",
      next: null,
    },
  },
  firstGesture: {
    init: {
      label: "Hey adventurer, have you seen a wallet?",
      options: [
        {
          optionLabel: "No, I don't think so",
          next: "farewell",
        },
        {
          optionLabel: "No, but do you have any spare gestures?",
          next: "farewell",
        },
      ],
    },
    farewell: {
      label: "Hmm... where is my wallet, It must be around here somewhere...",
      next: null,
    },
  },
};
