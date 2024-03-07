import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { BattleGameState, BattleStates } from "@/type.d";

export const StateSelect = ({ gameState }: { gameState: BattleGameState }) => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
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
  );
};
