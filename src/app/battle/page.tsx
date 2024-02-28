"use client";

import { useSearchParams } from "next/navigation";
import {
  useReducer,
  useContext,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from "react";
import { GestureKey } from "../../type.d";
import {
  InventoryContext,
  useInventoryData,
} from "../../hooks/useInventoryData";
import { isNotNull } from "@/typeguard.d";
import { PlotContext, usePlotData } from "@/hooks/usePlotData";
import { GestureIcon } from "@/components/gestureIcon/GestureIcon";

interface Gesture {
  name: GestureKey;
  hp: number;
}

enum States {
  PREP_ADD,
  PREP_REMOVE,
  PREP_READY,
  SELECT_GESTURE,
  GESTURE_REVEAL,
  HEALTH_CHANGE,
  RESULT,
}

// Actions
type Actions =
  | { type: "select" }
  | { type: "cursor_up" }
  | { type: "cursor_down" }
  | { type: "cursor_left" }
  | { type: "cursor_right" }
  | { type: "internal_continue" };

interface GameState {
  state: States;
  playerReserveGestures: [GestureKey, number][];
  playerBattleGestures: Gesture[];
  playerPlayedGestureIndex: number;
  aiBattleGestures: Gesture[];
  aiPlayedGestureIndex: number;
  cursorIndex: number;
}

const useGameState = () => {
  // TODO: This assumes the inventory only contains gestures
  // if other items are introduced, a filter need
  // to be introduced here.
  const { inventory } = useContext(InventoryContext);

  const initialValue: GameState = {
    state: States.PREP_ADD,
    playerReserveGestures: Object.entries(inventory) as [GestureKey, number][],
    playerBattleGestures: [],
    playerPlayedGestureIndex: 0,
    aiBattleGestures: [
      { name: "gesture-rock", hp: 10 },
      { name: "gesture-paper", hp: 10 },
      { name: "gesture-scissors", hp: 10 },
    ],
    aiPlayedGestureIndex: 0,
    cursorIndex: 0,
  };

  const reducer: React.Reducer<GameState, Actions> = (
    gameState: GameState,
    action: Actions,
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
      case States.PREP_ADD:
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
              { name: playerReserveGestures[cursorIndex][0], hp: 10 },
            ].sort((a, b) => (a.name > b.name ? 1 : -1)),
          };
        }
        if (action.type === "cursor_up" && playerBattleGestures.length > 0) {
          return {
            ...gameState,
            state: States.PREP_REMOVE,
          };
        }
        if (action.type === "cursor_down" && playerBattleGestures.length > 0) {
          return {
            ...gameState,
            state: States.PREP_READY,
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
      case States.PREP_REMOVE:
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
                ? States.PREP_ADD
                : States.PREP_REMOVE,
          };
        }
        if (action.type === "cursor_down" && playerBattleGestures.length > 0) {
          return {
            ...gameState,
            state: States.PREP_ADD,
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
      case States.PREP_READY:
        if (action.type === "select") {
          return {
            ...gameState,
            state: States.SELECT_GESTURE,
          };
        }
        if (action.type === "cursor_up") {
          return {
            ...gameState,
            state: States.PREP_ADD,
          };
        }
        return gameState;
      case States.SELECT_GESTURE:
        if (
          action.type === "select" &&
          playerBattleGestures[cursorIndex].hp > 0
        ) {
          const aiGestureIndexArr = aiBattleGestures.map((item, i) =>
            item.hp > 0 ? i : null,
          );
          const validAiGestureIndex: number[] =
            aiGestureIndexArr.filter(isNotNull);
          const aiGestureIndex = validAiGestureIndex[0] as number;
          return {
            ...gameState,
            playerPlayedGestureIndex: cursorIndex,
            aiPlayedGestureIndex: aiGestureIndex,
            state: States.GESTURE_REVEAL,
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
      case States.GESTURE_REVEAL:
        if (action.type === "internal_continue") {
          return { ...gameState, state: States.HEALTH_CHANGE };
        }
        return gameState;
      case States.HEALTH_CHANGE:
        if (action.type === "internal_continue") {
          return playerBattleGestures.filter((gesture) => gesture.hp).length ===
            0 || aiBattleGestures.filter((gesture) => gesture.hp).length === 0
            ? {
                ...gameState,
                state: States.RESULT,
              }
            : {
                ...gameState,
                state: States.PREP_ADD,
              };
        }
        return gameState;
      case States.RESULT:
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

function PageInner() {
  const searchParams = useSearchParams();
  const battleId = searchParams.get("id");
  const { gameState, onSelect, onLeft, onRight, onUp, onDown } = useGameState();

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft":
        onLeft();
        return;
      case "KeyS":
      case "ArrowDown":
        onDown();
        return;
      case "KeyD":
      case "ArrowRight":
        onRight();
        return;
      case "KeyW":
      case "ArrowUp":
        onUp();
        return;
      case "Enter":
      case "Space":
        onSelect();
        return;
      default:
        return;
    }
  };

  const playDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playDivRef.current) {
      playDivRef.current.focus();
    }
  }, []);

  return (
    <div
      className="flex w-full min-h-screen max-h-screen justify-center items-center bg-slate-700"
      onKeyDown={onKeyDown}
      tabIndex={-1}
      ref={playDivRef}
    >
      <div className="w-full aspect-3/2 bg-gray-300">
        {[States.PREP_ADD, States.PREP_REMOVE, States.PREP_READY].includes(
          gameState.state,
        ) && (
          <div className="flex flex-col gap-10 items-center justify-center h-full">
            <h1>Select the gestures to use for this combat</h1>
            <div className="flex gap-4 items-center">
              <h1>
                Chosen Gestures ({gameState.playerBattleGestures.length}/6):
              </h1>
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="bg-gray-400 w-20 h-20 rounded-lg">
                  {gameState.playerBattleGestures[i] && (
                    <GestureIcon
                      gestureKey={gameState.playerBattleGestures[i].name}
                      className={
                        i === gameState.cursorIndex &&
                        gameState.state === States.PREP_REMOVE
                          ? "shadow-lg shadow-blue-500 outline outline-gray-700"
                          : ""
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-8 items-center">
              <h1>Available Gestures:</h1>
              {Array.from({ length: 3 }).map((_, i) => (
                <GestureIcon
                  gestureKey={gameState.playerReserveGestures[i][0]}
                  count={gameState.playerReserveGestures[i][1]}
                  className={
                    i === gameState.cursorIndex &&
                    gameState.state === States.PREP_ADD
                      ? "shadow-lg shadow-blue-500 outline outline-gray-700"
                      : ""
                  }
                />
              ))}
            </div>
            <button
              className={
                gameState.state === States.PREP_READY
                  ? "shadow-lg shadow-blue-500 outline outline-gray-700"
                  : "border-blue-500 border-4 p-4"
              }
            >
              Chosen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const plotValue = usePlotData();
  const inventoryValue = useInventoryData();

  return (
    <PlotContext.Provider value={plotValue}>
      <InventoryContext.Provider value={inventoryValue}>
        {!plotValue.isLoading && !inventoryValue.isLoading && <PageInner />}
      </InventoryContext.Provider>
    </PlotContext.Provider>
  );
}
