"use client";

import Grid from "@/components/grid/Grid";
import Player from "@/components/player/Player";
import { mapData } from "./map";
import { useInput } from "../hooks/useInput";
import { useRef, useEffect } from "react";
import { usePondTriggers } from "./usePondTriggers";

export default function Home() {
  const { isMoving, direction, position, onKeyDown, onKeyUp } = useInput({
    mapData,
    initialPosition: [0, 20],
    initialDirection: "down",
  });
  const divRef = useRef<HTMLDivElement>(null);
  usePondTriggers(position);

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
