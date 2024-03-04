import { BattleGameState } from "@/type.d";

export const StateResult = ({ gameState }: { gameState: BattleGameState }) => {
  const isVictory = !!gameState.playerBattleGestures.filter(
    (gesture) => gesture.hp,
  ).length;
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <h1>{isVictory ? "Victory!" : "Defeat"}</h1>
      <span>Press 'Space' to continue...</span>
    </div>
  );
};
