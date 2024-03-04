import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { BattleGameState, BattleStates } from "@/type.d";

export const StateSelect = ({ gameState }: { gameState: BattleGameState }) => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <h1>Opponent gestures</h1>
      <div className="flex gap-4 items-center">
        {gameState.aiBattleGestures.map((gesture, i) => (
          <GestureIcon key={i} gestureKey={gesture.name} hp={gesture.hp} />
        ))}
      </div>
      <h1>Select your next gesture</h1>
      <div className="flex gap-4 items-center">
        {gameState.playerBattleGestures.map((gesture, i) => (
          <GestureIcon
            key={i}
            gestureKey={gesture.name}
            className={
              i === gameState.cursorIndex
                ? "shadow-lg shadow-blue-500 outline outline-gray-700"
                : ""
            }
            hp={gesture.hp}
          />
        ))}
      </div>
    </div>
  );
};
