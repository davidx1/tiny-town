import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { BattleGameState, BattleStates } from "@/type.d";
import { allowedGestureCount } from "./useBattleGameState";

export const StatePrep = ({ gameState }: { gameState: BattleGameState }) => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <h1>Select the gestures to use for this combat</h1>
      <div className="flex gap-4 items-center">
        <h1>
          Chosen Gestures ({gameState.playerBattleGestures.length}/
          {allowedGestureCount}):
        </h1>
        {Array.from({ length: allowedGestureCount }).map((_, i) => (
          <div className="bg-gray-400 w-20 h-20 rounded-lg">
            {gameState.playerBattleGestures[i] && (
              <GestureIcon
                key={i}
                gestureKey={gameState.playerBattleGestures[i].name}
                className={
                  i === gameState.cursorIndex &&
                  gameState.state === BattleStates.PREP_REMOVE
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
            key={gameState.playerReserveGestures[i][0]}
            gestureKey={gameState.playerReserveGestures[i][0]}
            count={gameState.playerReserveGestures[i][1]}
            className={
              i === gameState.cursorIndex &&
              gameState.state === BattleStates.PREP_ADD
                ? "shadow-lg shadow-blue-500 outline outline-gray-700"
                : ""
            }
          />
        ))}
      </div>
      <button
        className={
          gameState.state === BattleStates.PREP_READY
            ? "bg-blue-400 w-24 h-14 shadow-xl shadow-blue-500 outline outline-gray-700"
            : "bg-blue-400 w-24 h-14"
        }
      >
        Confirm
      </button>
    </div>
  );
};
