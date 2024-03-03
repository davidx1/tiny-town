import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { BattleGameState } from "@/type.d";

export const StateRevealNChange = ({
  gameState,
}: {
  gameState: BattleGameState;
}) => {
  const pIndex = gameState.playerPlayedGestureIndex;
  const pName = gameState.playerBattleGestures[pIndex].name;
  const pHp = gameState.playerBattleGestures[pIndex].hp;

  const aIndex = gameState.aiPlayedGestureIndex;
  const aName = gameState.playerBattleGestures[aIndex].name;
  const aHp = gameState.playerBattleGestures[aIndex].hp;
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <div className="flex flex-col gap-4 items-center">
        <GestureIcon gestureKey={aName} hp={aHp} />
        <GestureIcon gestureKey={pName} hp={pHp} />
      </div>
    </div>
  );
};
