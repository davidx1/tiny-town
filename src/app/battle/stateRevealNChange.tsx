import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { StoreContext } from "@/stores/rootStore";
import { BattleGameState } from "@/type.d";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const StateRevealNChange = observer(() => {
  const { battleStore: gameState } = useContext(StoreContext);
  const pIndex = gameState.playerPlayedGestureIndex;
  const pName = gameState.playerBattleGestures[pIndex].name;
  const pHp = gameState.playerBattleGestures[pIndex].hp;

  const aIndex = gameState.aiPlayedGestureIndex;
  const aName = gameState.aiBattleGestures[aIndex].name;
  const aHp = gameState.aiBattleGestures[aIndex].hp;
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center gap-10 max-w-[900px]">
        <div>
          <h1 className="text-2xl mb-8">Damage Calculation</h1>
          <p>
            The losing gesture will take damage while the winning gesture will
            recover a little HP. In the event of a tie, both gesture will lose
            some HP.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <GestureIcon gestureKey={aName} hp={aHp} bg="red" />
          <GestureIcon gestureKey={pName} hp={pHp} />
        </div>
        <span>{"Press 'Space' to continue..."}</span>
      </div>
    </div>
  );
});
