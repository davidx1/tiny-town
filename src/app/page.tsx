"use client";

import Grid from "@/components/grid/Grid";
import Player from "@/components/player/Player";
import { mapData } from "./map";
import { useInput } from "./hooks/useInput";
import { useRef, RefObject, useEffect } from "react";

export default function Home() {
  const { isMoving, direction, position, onKeyDown, onKeyUp } = useInput({
    mapData,
    initialPosition: [16, 20],
  });
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
      <Player direction={direction} isMoving={isMoving} />
      <Grid data={mapData} position={position}></Grid>
    </div>
  );
}
