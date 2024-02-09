import { TextRecord } from "../type.d";

export const townConvoRecord: TextRecord = {
  introduction: {
    init: {
      label: "Welcome, adventurer! To the land of paper, scissors, rock!",
      next: "intro2",
    },
    intro2: {
      label:
        "Mastering them is both art and strategy. Collect unique gestures, challenge rivals, and compete in the RPS League.",
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
        "Gestures are scattered across the land. You should look around town. .",
      next: "gestures2",
    },
    gestures2: {
      label:
        "Mastering them is both art and strategy. Collect unique gestures, challenge rivals, and compete in the RPS League.",
      next: "selection",
    },
    farewell: {
      label: "Alright, good luck!",
      next: null,
    },
  },
};
