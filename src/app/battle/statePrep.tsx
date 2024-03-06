import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { BattleGameState, BattleStates } from "@/type.d";
import { allowedGestureCount } from "./useBattleGameState";

export const StatePrep = ({ gameState }: { gameState: BattleGameState }) => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <h1>Select the gestures to use for this combat</h1>

      <div className="grid grid-cols-3 grid-rows-3 gap-10 place-content-center">
        <h1>Your opponents loadout:</h1>
        <div className="flex gap-4 col-span-2">
          {gameState.aiBattleGestures.map((gesture, i) => (
            <div key={i} className="bg-gray-400 w-20 h-20 rounded-lg">
              <GestureIcon gestureKey={gesture.name} />
            </div>
          ))}
        </div>
        <h1>
          Your Chosen Gestures ({gameState.playerBattleGestures.length}/
          {allowedGestureCount}):
        </h1>
        <div className="flex gap-4 col-span-2">
          {Array.from({ length: allowedGestureCount }).map((_, i) => (
            <div key={i} className="bg-gray-400 w-20 h-20 rounded-lg">
              {gameState.playerBattleGestures[i] && (
                <GestureIcon
                  gestureKey={gameState.playerBattleGestures[i].name}
                  className={
                    i === gameState.cursorIndex &&
                    gameState.state === BattleStates.PREP_REMOVE
                      ? "shadow-xl shadow-blue-800 outline outline-offset-2 outline-gray-700"
                      : ""
                  }
                />
              )}
            </div>
          ))}
        </div>
        <h1>Available Gestures:</h1>
        <div className="flex gap-4 col-span-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <GestureIcon
              key={gameState.playerReserveGestures[i][0]}
              gestureKey={gameState.playerReserveGestures[i][0]}
              count={gameState.playerReserveGestures[i][1]}
              className={
                i === gameState.cursorIndex &&
                gameState.state === BattleStates.PREP_ADD
                  ? "shadow-xl shadow-blue-800 outline outline-offset-2 outline-gray-600"
                  : ""
              }
            />
          ))}
        </div>
      </div>
      <button
        className={
          gameState.state === BattleStates.PREP_READY
            ? "bg-blue-400 w-24 h-14 shadow-xl shadow-blue-800 outline outline-offset-2 outline-gray-700"
            : "bg-blue-400 w-24 h-14"
        }
      >
        Confirm
      </button>
    </div>
  );
};
