import { InventoryContext } from "@/hooks/useInventoryData";
import {
  BattleGameState,
  BattleStates,
  GestureKey,
  BattleActions,
} from "@/type.d";
import { isNotNull } from "@/typeguard.d";
import { useContext, useReducer } from "react";

export const useBattleGameState = () => {
  // TODO: This assumes the inventory only contains gestures
  // if other items are introduced, a filter need
  // to be introduced here.
  const { inventory } = useContext(InventoryContext);

  const initialValue: BattleGameState = {
    state: BattleStates.PREP_ADD,
    playerReserveGestures: Object.entries(inventory) as [GestureKey, number][],
    playerBattleGestures: [],
    playerPlayedGestureIndex: 0,
    aiBattleGestures: [
      { name: "gesture-rock", hp: 4 },
      { name: "gesture-paper", hp: 4 },
      { name: "gesture-scissors", hp: 4 },
    ],
    aiPlayedGestureIndex: 0,
    cursorIndex: 0,
  };

  const reducer: React.Reducer<BattleGameState, BattleActions> = (
    gameState: BattleGameState,
    action: BattleActions,
  ) => {
    const {
      state,
      cursorIndex,
      playerBattleGestures,
      playerReserveGestures,
      playerPlayedGestureIndex,
      aiBattleGestures,
      aiPlayedGestureIndex,
    } = gameState;

    switch (state) {
      case BattleStates.PREP_ADD:
        if (
          action.type === "select" &&
          playerReserveGestures[cursorIndex][1] > 0 &&
          playerBattleGestures.length < 6
        ) {
          return {
            ...gameState,
            playerReserveGestures: playerReserveGestures.map((item, index) =>
              index === cursorIndex ? [item[0], item[1] - 1] : item,
            ),
            playerBattleGestures: [
              ...playerBattleGestures,
              { name: playerReserveGestures[cursorIndex][0], hp: 4 },
            ].sort((a, b) => (a.name > b.name ? 1 : -1)),
          };
        }
        if (action.type === "cursor_up" && playerBattleGestures.length > 0) {
          return {
            ...gameState,
            state: BattleStates.PREP_REMOVE,
          };
        }
        if (action.type === "cursor_down" && playerBattleGestures.length > 0) {
          return {
            ...gameState,
            state: BattleStates.PREP_READY,
          };
        }
        if (action.type === "cursor_right") {
          return {
            ...gameState,
            cursorIndex: (cursorIndex + 1) % 3,
          };
        }
        if (action.type === "cursor_left") {
          return {
            ...gameState,
            cursorIndex: (cursorIndex + 2) % 3,
          };
        }
        return gameState;
      case BattleStates.PREP_REMOVE:
        if (action.type === "select") {
          const gestureNameToRemove = playerBattleGestures[cursorIndex].name;
          return {
            ...gameState,
            playerReserveGestures: playerReserveGestures.map((item) =>
              item[0] === gestureNameToRemove ? [item[0], item[1] + 1] : item,
            ),
            playerBattleGestures: [
              ...playerBattleGestures.slice(0, cursorIndex),
              ...playerBattleGestures.slice(cursorIndex + 1),
            ],
            state:
              playerBattleGestures.length === 1
                ? BattleStates.PREP_ADD
                : BattleStates.PREP_REMOVE,
          };
        }
        if (action.type === "cursor_down" && playerBattleGestures.length > 0) {
          return {
            ...gameState,
            state: BattleStates.PREP_ADD,
          };
        }
        if (action.type === "cursor_right") {
          return {
            ...gameState,
            cursorIndex: (cursorIndex + 1) % 6,
          };
        }
        if (action.type === "cursor_left") {
          return {
            ...gameState,
            cursorIndex: (cursorIndex + 5) % 6,
          };
        }
        return gameState;
      case BattleStates.PREP_READY:
        if (action.type === "select") {
          return {
            ...gameState,
            state: BattleStates.SELECT_GESTURE,
            cursorIndex: 0,
          };
        }
        if (action.type === "cursor_up") {
          return {
            ...gameState,
            state: BattleStates.PREP_ADD,
          };
        }
        return gameState;
      case BattleStates.SELECT_GESTURE:
        if (
          action.type === "select" &&
          playerBattleGestures[cursorIndex].hp > 0
        ) {
          const aiGestureIndexArr = aiBattleGestures
            .map((item, i) => (item.hp > 0 ? i : null))
            .filter(isNotNull);

          console.log(aiGestureIndexArr);
          const aiGestureIndex = aiGestureIndexArr[0] as number;
          return {
            ...gameState,
            playerPlayedGestureIndex: cursorIndex,
            aiPlayedGestureIndex: aiGestureIndex,
            state: BattleStates.GESTURE_REVEAL,
          };
        }
        if (action.type === "cursor_right") {
          return {
            ...gameState,
            cursorIndex: (cursorIndex + 1) % 6,
          };
        }
        if (action.type === "cursor_left") {
          return {
            ...gameState,
            cursorIndex: (cursorIndex + 5) % 6,
          };
        }
        return gameState;
      case BattleStates.GESTURE_REVEAL:
        if (action.type === "select") {
          const powers: GestureKey[] = [
            "gesture-rock",
            "gesture-paper",
            "gesture-scissors",
          ];
          const pIndex = playerPlayedGestureIndex;
          const playedGestureName = playerBattleGestures[pIndex].name;
          const pPower = powers.indexOf(playedGestureName);

          const aIndex = aiPlayedGestureIndex;
          const aGestureName = aiBattleGestures[pIndex].name;
          const aPower = powers.indexOf(aGestureName);

          if (pPower - aPower === 0) {
            //tie
            return {
              ...gameState,
              state: BattleStates.HEALTH_CHANGE,
              aiBattleGestures: aiBattleGestures.map((g, i) =>
                i === aIndex ? { ...g, hp: g.hp - 1 } : g,
              ),
              playerBattleGestures: playerBattleGestures.map((g, i) =>
                i === pIndex ? { ...g, hp: g.hp - 1 } : g,
              ),
            };
          } else if (pPower - aPower === 1 || pPower - aPower === -2) {
            //victory
            return {
              ...gameState,
              state: BattleStates.HEALTH_CHANGE,
              aiBattleGestures: aiBattleGestures.map((g, i) =>
                i === aIndex ? { ...g, hp: g.hp > 2 ? g.hp - 2 : 0 } : g,
              ),
            };
          } else if (pPower - aPower === -1 || pPower - aPower === 2) {
            //failure
            return {
              ...gameState,
              state: BattleStates.HEALTH_CHANGE,
              playerBattleGestures: playerBattleGestures.map((g, i) =>
                i === pIndex ? { ...g, hp: g.hp > 2 ? g.hp - 2 : 0 } : g,
              ),
            };
          }
        }
        return gameState;
      case BattleStates.HEALTH_CHANGE:
        if (action.type === "select") {
          return playerBattleGestures.filter((gesture) => gesture.hp).length ===
            0 || aiBattleGestures.filter((gesture) => gesture.hp).length === 0
            ? {
                ...gameState,
                state: BattleStates.RESULT,
              }
            : {
                ...gameState,
                state: BattleStates.SELECT_GESTURE,
              };
        }
        return gameState;
      case BattleStates.RESULT:
        return gameState;
      default:
        return gameState;
    }
  };

  const [gameState, dispatch] = useReducer(reducer, initialValue);

  const onSelect = () => dispatch({ type: "select" });
  const onLeft = () => dispatch({ type: "cursor_left" });
  const onRight = () => dispatch({ type: "cursor_right" });
  const onUp = () => dispatch({ type: "cursor_up" });
  const onDown = () => dispatch({ type: "cursor_down" });
  return { gameState, onSelect, onLeft, onRight, onUp, onDown };
};
