import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { BattleGameState, BattleStates } from "@/type.d";

export const StateSelect = ({ gameState }: { gameState: BattleGameState }) => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <h1>Select a gesture</h1>
      <div className="flex gap-4 items-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="bg-gray-400 w-20 h-20 rounded-lg">
            {gameState.playerBattleGestures[i] && (
              <GestureIcon
                key={i}
                gestureKey={gameState.playerBattleGestures[i].name}
                className={
                  i === gameState.cursorIndex
                    ? "shadow-lg shadow-blue-500 outline outline-gray-700"
                    : ""
                }
                hp={gameState.playerBattleGestures[i].hp}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
