"use client";

import { useInitialPosition } from "@/app/hooks/useInitialPosition";
import { useInput } from "@/app/hooks/useInput";
import { useMapData } from "@/app/hooks/useMapData";
import { useTriggers } from "@/app/hooks/useTriggers";
import Grid from "@/components/grid/Grid";
import Player from "@/components/player/Player";
import { TextArea } from "@/components/textarea/TextArea";
import { useRef, useEffect, useContext } from "react";
import { TextareaContext } from "../textarea/useTextareaContext";

export function PageView({
  mapDataKey,
  initialPositionRecords,
  triggerRecord,
}: any) {
  const { mapData } = useMapData(mapDataKey);

  const { initialPosition, initialDirection } = useInitialPosition(
    initialPositionRecords,
  );

  const { label, options } = useContext(TextareaContext);
  const isTextAreaOpen = !!label || !!options;

  const { isMoving, direction, position, onKeyDown, onKeyUp } = useInput({
    mapData,
    initialPosition: initialPosition,
    initialDirection: initialDirection,
    isTextAreaOpen: isTextAreaOpen,
  });

  const playDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playDivRef.current) {
      playDivRef.current.focus();
    }
  }, []);

  useTriggers(mapData, position, triggerRecord);

  return (
    <div className="relative overflow-hidden w-full min-h-screen max-h-screen bg-slate-700">
      <div
        className="relative"
        style={{ top: "49vh", left: "49vw" }}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        tabIndex={-1}
        ref={playDivRef}
      >
        <Player direction={direction} isMoving={isMoving} />
        <Grid data={mapData} position={position}></Grid>
      </div>
      <TextArea />
    </div>
  );
}
