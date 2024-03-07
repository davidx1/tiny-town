import { GestureIcon } from "@/components/gestureIcon/GestureIcon";
import { BattleGameState } from "@/type.d";

export const StateResult = ({ gameState }: { gameState: BattleGameState }) => {
  const isVictory = !!gameState.playerBattleGestures.filter(
    (gesture) => gesture.hp,
  ).length;

  const bgClass = isVictory ? "bg-battle-victory" : "bg-battle-defeat";

  return (
    <div
      className={`flex flex-col gap-10 items-center justify-center h-full ${bgClass}`}
    >
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
      <h1 className="text-2xl">{isVictory ? "Victory!" : "Defeat"}</h1>
      <div className="flex gap-4 items-center">
        {gameState.playerBattleGestures.map((gesture, i) => (
          <GestureIcon key={i} gestureKey={gesture.name} hp={gesture.hp} />
        ))}
      </div>
      <span>{"Press 'Space' to continue..."}</span>
    </div>
  );
};
