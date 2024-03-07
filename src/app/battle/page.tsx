"use client";

import { useSearchParams } from "next/navigation";
import { KeyboardEventHandler, useEffect, useRef } from "react";
import { BattleIds, BattleStates, BattleStrategiesKey } from "../../type.d";
import {
  InventoryContext,
  useInventoryData,
} from "../../hooks/useInventoryData";
import { PlotContext, usePlotData } from "@/hooks/usePlotData";
import { StatePrep } from "./statePrep";
import { StateSelect } from "./stateSelect";
import { StateRevealNChange } from "./stateRevealNChange";
import { StateResult } from "./stateResult";
import { useBattleGameState } from "./useBattleGameState";

function PageInner() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("prev");
  const battleId = searchParams.get("id");
  const strategy = searchParams.get("strat");

  //TODO: add type guard to ensure the battle Id is a valid battle Id
  if (!battleId || !returnUrl || !strategy) {
    throw new Error("Missing critical information for battle");
  }

  const { gameState, onSelect, onLeft, onRight, onUp, onDown } =
    useBattleGameState(
      battleId as BattleIds,
      strategy as BattleStrategiesKey,
      returnUrl,
    );

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft":
        onLeft();
        return;
      case "KeyS":
      case "ArrowDown":
        onDown();
        return;
      case "KeyD":
      case "ArrowRight":
        onRight();
        return;
      case "KeyW":
      case "ArrowUp":
        onUp();
        return;
      case "Enter":
      case "Space":
        onSelect();
        return;
      default:
        return;
    }
  };

  const playDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playDivRef.current) {
      playDivRef.current.focus();
    }
  }, []);

  return (
    <>
      <div
        className="flex w-full min-h-screen max-h-screen justify-center items-center bg-slate-700"
        onKeyDown={onKeyDown}
        tabIndex={-1}
        ref={playDivRef}
      >
        <div className="w-full aspect-3/2 bg-gray-300">
          {[
            BattleStates.PREP_ADD,
            BattleStates.PREP_REMOVE,
            BattleStates.PREP_READY,
          ].includes(gameState.state) ? (
            <StatePrep gameState={gameState} />
          ) : BattleStates.SELECT_GESTURE === gameState.state ? (
            <StateSelect gameState={gameState} />
          ) : [
              BattleStates.GESTURE_REVEAL,
              BattleStates.HEALTH_CHANGE,
            ].includes(gameState.state) ? (
            <StateRevealNChange gameState={gameState} />
          ) : BattleStates.RESULT === gameState.state ? (
            <StateResult gameState={gameState} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <audio autoPlay={true} loop controls style={{ marginTop: "-100px" }}>
        <source src="/battle-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default function Page() {
  const plotValue = usePlotData();
  const inventoryValue = useInventoryData();

  return (
    <PlotContext.Provider value={plotValue}>
      <InventoryContext.Provider value={inventoryValue}>
        {!plotValue.isLoading && !inventoryValue.isLoading && <PageInner />}
      </InventoryContext.Provider>
    </PlotContext.Provider>
  );
}
