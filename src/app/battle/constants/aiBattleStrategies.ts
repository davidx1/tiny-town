import { BattleGesture, GestureKey, BattleStrategiesKey } from "@/type.d";
import { isNotNull } from "@/typeguard.d";
import { powerRanking } from "./battlePowerRanking";

const playRandom = (gestures: BattleGesture[]) => {
  const aiGestureIndexArr = gestures
    .map((item, i) => (item.hp > 0 ? i : null))
    .filter(isNotNull);

  return aiGestureIndexArr[
    Math.trunc(Math.random() * aiGestureIndexArr.length)
  ];
};

export const aiBattleStrategies: Record<
  BattleStrategiesKey,
  (gestures: BattleGesture[], playerGesture: GestureKey) => number
> = {
  "first-available": (gestures, _) => {
    return gestures.findIndex((item) => item.hp > 0);
  },
  random: playRandom,
  "random-advantage": (gestures, playerGesture) => {
    const attemptWinningMoveThreshold = 0.8;
    const playerPower = powerRanking.indexOf(playerGesture);
    const winningGesture = powerRanking[(playerPower + 1) % 3];
    const winningIndex = gestures.findIndex(
      (gesture) => gesture.name === winningGesture && gesture.hp > 0,
    );

    const tryToWin = Math.random() > attemptWinningMoveThreshold;
    if (tryToWin && winningIndex >= 0) {
      return winningIndex;
    }

    return playRandom(gestures);
  },
  "amplified-probability": (gestures, _) => {
    const probabilityOfPlayingMostCommon = 0.3;

    if (Math.random() > probabilityOfPlayingMostCommon) {
      return playRandom(gestures);
    }

    const occurances: Record<GestureKey, number> = {
      "gesture-paper": 0,
      "gesture-rock": 0,
      "gesture-scissors": 0,
    };
    let mostCommonName: GestureKey = "gesture-paper";

    gestures.forEach((gesture) => {
      if (gesture.hp > 0) {
        occurances[gesture.name]++;
        if (occurances[gesture.name] > occurances[mostCommonName]) {
          mostCommonName = gesture.name;
        }
      }
    });

    return gestures.findIndex(
      (gesture) => gesture.hp > 0 && gesture.name === mostCommonName,
    );
  },
};
