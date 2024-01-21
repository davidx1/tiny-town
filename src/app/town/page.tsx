"use client";

import Grid from "@/components/grid/Grid";
import Player from "@/components/player/Player";
import { mapData } from "./map";
import { useInput } from "../hooks/useInput";
import { useRef, useEffect } from "react";
import { useTownTriggers } from "./useTownTriggers";
import { useInitialPosition } from "../hooks/useInitialPosition";
import { initialPositionRecords } from "./initialPositionRecords";

export default function Home() {
  const { initialPosition, initialDirection } = useInitialPosition(
    initialPositionRecords,
  );
  const { isMoving, direction, position, onKeyDown, onKeyUp } = useInput({
    mapData,
    initialPosition: initialPosition,
    initialDirection: initialDirection,
  });
  const divRef = useRef<HTMLDivElement>(null);
  useTownTriggers(position);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <div
      className="relative overflow-hidden w-full min-h-screen max-h-screen bg-slate-700"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      tabIndex={-1}
      ref={divRef}
    >
      <div className="relative" style={{ top: "49vh", left: "49vw" }}>
        <Player direction={direction} isMoving={isMoving} />
        <Grid data={mapData} position={position}></Grid>
      </div>
    </div>
  );
}
