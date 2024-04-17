import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { StoreContext } from "@/stores/rootStore";
import { BattleGameState, BattleStates } from "@/type.d";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const StateSelect = observer(() => {
  const { battleStore: gameState } = useContext(StoreContext);
  return (
    <div className="flex flex-col items-center justify-center h-full p-20">
      <div className="flex flex-col items-center gap-8 max-w-[900px]">
        <div>
          <h1 className="text-2xl mb-8">Gesture Selection</h1>
          <p>
            Each round you can choose 1 gesture to play. The chosen gesture
            fight against the opposing gesture.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {gameState.aiBattleGestures.map((gesture, i) => (
            <GestureIcon
              key={i}
              gestureKey={gesture.name}
              hp={gesture.hp}
              bg="red"
            />
          ))}
        </div>

        <h1 className="text-xl">Select a gesture to play</h1>

        <div className="flex gap-4 items-center">
          {gameState.playerBattleGestures.map((gesture, i) => (
            <GestureIcon
              key={i}
              gestureKey={gesture.name}
              className={
                i === gameState.cursorIndex
                  ? "shadow-md shadow-blue-800 outline outline-offset-2 outline-gray-600"
                  : ""
              }
              hp={gesture.hp}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
