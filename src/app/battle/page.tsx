"use client";

import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BattleStates, isBattleId, isBattleStrategiesKey } from "../../type.d";
import { StatePrep } from "./statePrep";
import { StateSelect } from "./stateSelect";
import { StateRevealNChange } from "./stateRevealNChange";
import { StateResult } from "./stateResult";
import { StoreContext, store } from "@/stores/rootStore";
import { useInput } from "@/hooks/useInput";
import { observer } from "mobx-react-lite";

export default function Page() {
  return <PageView />;
}

const PageView = () => {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("prev");
  const battleId = searchParams.get("id");
  const battleStrategyKey = searchParams.get("strat");

  if (
    !isBattleId(battleId) ||
    !returnUrl ||
    !isBattleStrategiesKey(battleStrategyKey)
  ) {
    throw new Error("Invalid battle parameters");
  }

  const {
    onKeyPressed,
    onKeyReleased,
    initialize,
    battleStore: { startBattle },
  } = store;
  useInput({ onKeyPressed, onKeyReleased });

  useEffect(() => {
    initialize({});
    startBattle({ battleId, battleStrategyKey, returnUrl });
  }, []);

  return (
    <StoreContext.Provider value={store}>
      <BattlePageView />
    </StoreContext.Provider>
  );
};

const BattlePageView = observer(() => {
  const store = useContext(StoreContext);
  const { playerBattleGestures, state } = store.battleStore;
  const [musicSource, setMusicSource] = useState(
    `${process.env.myBasePath}/battle-music.mp3`,
  );

  useEffect(() => {
    if (
      state === BattleStates.RESULT &&
      musicSource === `${process.env.myBasePath}/battle-music.mp3`
    ) {
      if (playerBattleGestures.every((gesture) => gesture.hp === 0)) {
        setMusicSource(`${process.env.myBasePath}/defeat.mp3`);
      } else {
        setMusicSource(`${process.env.myBasePath}/victory.mp3`);
      }
    }
  }, [musicSource, playerBattleGestures, state]);

  return (
    <>
      <div className="flex w-full min-h-screen max-h-screen justify-center items-center bg-slate-700">
        <div className="w-full aspect-3/2 bg-gray-300">
          {[
            BattleStates.PREP_ADD,
            BattleStates.PREP_REMOVE,
            BattleStates.PREP_READY,
          ].includes(state) ? (
            <>
              <StatePrep />
            </>
          ) : BattleStates.SELECT_GESTURE === state ? (
            <StateSelect />
          ) : [
              BattleStates.GESTURE_REVEAL,
              BattleStates.HEALTH_CHANGE,
            ].includes(state) ? (
            <StateRevealNChange />
          ) : BattleStates.RESULT === state ? (
            <StateResult />
          ) : (
            <></>
          )}
        </div>
      </div>
      <audio
        autoPlay={true}
        loop={state !== BattleStates.RESULT}
        controls
        style={{ marginTop: "-100px" }}
        src={musicSource}
      >
        Your browser does not support the audio element.
      </audio>
    </>
  );
});
