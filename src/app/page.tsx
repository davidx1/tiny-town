"use client";

import Grid, { Cell } from "@/components/grid/Grid";
import Player from "@/components/player/Player";
import { mapData } from "./map";
import { useInput } from "./hooks/useInput";
import { useRef, RefObject, useEffect } from "react";

export default function Home() {
  const { isMoving, direction, position, onKeyDown, onKeyUp } = useInput();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <div
      className="relative overflow-hidden w-full min-h-screen bg-slate-700"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      tabIndex={-1}
      ref={divRef}
    >
      <Grid data={mapData} position={position}></Grid>
      <Player direction={direction} isMoving={isMoving} />
    </div>
  );
}
