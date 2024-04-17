import { ConversationRecord } from "../../type.d";

export const townConvoRecord: ConversationRecord = {
  doctor: {
    init: {
      label: "Welcome, adventurer! How can I help you today?",
      options: [
        {
          optionLabel: "Can you teach me about this town?",
          next: "intro2",
          plotCondition: [{ key: "talked-to-professor", status: false }],
        },
        {
          optionLabel: "Do you have any spare gestures?",
          next: "noGetRock",
          plotCondition: [
            { key: "talked-to-professor", status: true },
            { key: "collected-rock", status: true },
          ],
        },
        {
          optionLabel: "Where do I get more gestures?",
          next: "gestures",
          plotCondition: [
            { key: "talked-to-professor", status: true },
            { key: "collected-rock", status: true },
          ],
        },
        {
          optionLabel: "Nothing right now, thanks.",
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
          optionLabel: "Do you have any spare gestures?",
          next: "getRock",
          plotCondition: [
            { key: "talked-to-professor", status: true },
            { key: "collected-rock", status: false },
          ],
        },
        {
          optionLabel: "Where do I get the gestures?",
          next: "gestures",
        },
        {
          optionLabel: "No thanks",
          next: "farewell",
          plotCondition: [
            { key: "talked-to-professor", status: true },
            { key: "collected-rock", status: true },
          ],
        },
      ],
    },
    gestures: {
      label:
        "Gestures are scattered across the land. You could find them everywhere.",
      next: "gestures2",
      reachedPlotPoint: "talked-to-professor",
    },
    gestures2: {
      label:
        "Some of the towns folk might have some spares too. You should ask around.",
      next: "gestures3",
    },
    gestures3: {
      label:
        "I hear Jenny the shopkeeper, and the fisherman.... whatever his name is... have quite a few extra gestures.",
      next: "selection",
    },
    getRock: {
      label: "Here is a few Rock gestures to get you started",
      next: "selection",
      itemAction: {
        type: "add",
        key: "gesture-rock",
        count: 3,
      },
      reachedPlotPoint: "collected-rock",
    },
    noGetRock: {
      label: "I'm afraid I've given you all the gestures I can spare",
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
          optionLabel: "Yes it is!",
          next: "farewell",
          plotCondition: [{ key: "talked-to-professor", status: false }],
        },
        {
          optionLabel: "Sure! And thanks for the scissors!",
          next: "farewell",
          plotCondition: [{ key: "collected-scissors", status: true }],
        },
        {
          optionLabel: "Do you have any spare gestures?",
          next: "farewell2",
          plotCondition: [
            { key: "talked-to-professor", status: true },
            { key: "collected-scissors", status: false },
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
      label: "Here you go, henehn (short laughter)",
      next: null,
      itemAction: {
        type: "add",
        key: "gesture-scissors",
        count: 2,
      },
      reachedPlotPoint: "collected-scissors",
    },
  },
  shopkeeper: {
    init: {
      label: "Hello adventurer, What can I do for you?",
      options: [
        {
          optionLabel: "Nothing at the moment, thanks.",
          next: "farewell",
          plotCondition: [{ key: "talked-to-professor", status: false }],
        },
        {
          optionLabel: "Do you have any spare gestures you can give me?",
          next: "gesture",
          plotCondition: [
            { key: "talked-to-professor", status: true },
            { key: "collected-paper", status: false },
          ],
        },
        {
          optionLabel: "Do you have any more spare gestures you can give me?",
          next: "no_gestures",
          plotCondition: [
            { key: "talked-to-professor", status: true },
            { key: "collected-paper", status: true },
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
        "You know I dreamt of being a Rock Paper Scissors battler too when I was younger. But I just couldn't get the hang of it.",
      next: "gesture3",
    },
    gesture3: {
      label:
        "Here are some paper gestures. Hope they serve you better than they've served me!",
      next: null,
      itemAction: {
        type: "add",
        key: "gesture-paper",
        count: 2,
      },
      reachedPlotPoint: "collected-paper",
    },
    no_gestures: {
      label:
        "I'm afraid not, sorry. Have you tried the fisherman? Or the doc? I hear they've got Rocks and Scissors",
      next: null,
    },
    farewell: {
      label: "That's great. Have a safe trip!",
      next: null,
    },
  },
  "forest-missing-knowledge": {
    init: {
      label:
        "This is the way into the forest. I should chat to the towns folk and learn more about this world before heading out.",
      next: null,
    },
  },
  "forest-missing-gesture": {
    init: {
      label:
        "I should collect more rock paper scissors battle gestures before heading into the forest.",
      next: null,
    },
  },
};
