import { GestureIcon } from "@/components/GestureIcon";
import { BattleStates } from "@/type.d";
import { StoreContext } from "@/stores/rootStore";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { allowedGestureCount } from "./constants/fixedValues";

export const StatePrep = observer(() => {
  const store = useContext(StoreContext);
  const {
    battleStore: {
      playerReserveGestures,
      cursorIndex,
      aiBattleGestures,
      playerBattleGestures,
      state,
    },
  } = store;

  return (
    <div className="flex flex-col justify-center items-center h-full p-20 ">
      <div className="flex flex-col gap-10 max-w-[900px]">
        <div>
          <h1 className="text-2xl mb-8">Loadout Selection</h1>
          <p>
            The first step in a battle is loadout selection. You can choose up
            to 4 different gestures. Rock beats scissors, scissors beats paper,
            and paper beats rock. Keep an eye on your opponents loadout and
            choose approprietly.
          </p>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-10 place-content-center">
          <h1>Your opponents loadout:</h1>
          <div className="flex gap-4 col-span-2">
            {aiBattleGestures.map((gesture, i) => (
              <div key={i} className="bg-gray-400 w-20 h-20 rounded-lg">
                <GestureIcon gestureKey={gesture.name} bg="red" />
              </div>
            ))}
          </div>
          <h1>
            Your loadout ({playerBattleGestures.length}/{allowedGestureCount}):
          </h1>
          <div className="flex gap-4 col-span-2">
            {Array.from({ length: allowedGestureCount }).map((_, i) => (
              <div key={i} className="bg-gray-400 w-20 h-20 rounded-lg">
                {playerBattleGestures[i] && (
                  <GestureIcon
                    gestureKey={playerBattleGestures[i].name}
                    className={
                      i === cursorIndex && state === BattleStates.PREP_REMOVE
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
                key={playerReserveGestures[i][0]}
                gestureKey={playerReserveGestures[i][0]}
                count={playerReserveGestures[i][1]}
                className={
                  i === cursorIndex && state === BattleStates.PREP_ADD
                    ? "shadow-xl shadow-blue-800 outline outline-offset-2 outline-gray-600"
                    : ""
                }
              />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className={
              state === BattleStates.PREP_READY
                ? "bg-blue-400 w-24 h-14 shadow-xl shadow-blue-800 outline outline-offset-2 outline-gray-700"
                : "bg-blue-400 w-24 h-14"
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
});
