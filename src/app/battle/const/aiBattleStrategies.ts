import { BattleGesture, GestureKey, BattleStrategiesKey } from "@/type.d";
import { isNotNull } from "@/typeguard.d";
import { powerRanking } from "./battlePowerRanking";

export const aiBattleStrategies: Record<
  BattleStrategiesKey,
  (gestures: BattleGesture[], playerGesture: GestureKey) => number
> = {
  "first-available": (gestures, _) => {
    return gestures.findIndex((item) => item.hp > 0);
  },
  random: (gestures, _) => {
    const aiGestureIndexArr = gestures
      .map((item, i) => (item.hp > 0 ? i : null))
      .filter(isNotNull);

    return aiGestureIndexArr[
      Math.trunc(Math.random() * aiGestureIndexArr.length)
    ];
  },
  "random-advantage": (gestures, playerGesture) => {
    const attemptWinningMoveThreshold = 0.8;
    const playerPower = powerRanking.indexOf(playerGesture);
    const winningGesture = powerRanking[(playerPower + 1) % 3];
    const winningIndex = gestures.findIndex(
      (gesture) => gesture.name === winningGesture && gesture.hp > 0,
    );

    console.log(gestures, playerGesture, winningGesture, winningIndex);

    const tryToWin = Math.random() > attemptWinningMoveThreshold;
    if (tryToWin && winningIndex >= 0) {
      return winningIndex;
    }

    const aiGestureIndexArr = gestures
      .map((item, i) => (item.hp > 0 ? i : null))
      .filter(isNotNull);

    return aiGestureIndexArr[
      Math.trunc(Math.random() * aiGestureIndexArr.length)
    ];
  },
};
