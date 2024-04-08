"use client";

import { useInitialPosition } from "@/hooks/useInitialPosition";
import { useMapData } from "@/hooks/useMapData";
import Grid from "@/components/grid/Grid";
import { TextArea } from "@/components/textarea/TextArea";
import { useEffect } from "react";
import { Gui } from "../gui/Gui";
import { useInput } from "@/hooks/useInput";
import { Player } from "../character/Player";
import { StoreContext, store } from "@/stores/rootStore";

export const PageView = ({ mapDataKey, initialPositionRecords }: any) => {
  const { mapData } = useMapData(mapDataKey);

  const { initialPosition, initialDirection } = useInitialPosition(
    initialPositionRecords,
  );

  const {
    onUpPressed,
    onUpReleased,
    onDownPressed,
    onDownReleased,
    onLeftPressed,
    onLeftReleased,
    onRightPressed,
    onRightReleased,
    onSelectPressed,
    onSelectReleased,
    initialize,
  } = store;

  useInput({
    onUpPressed,
    onUpReleased,
    onDownPressed,
    onDownReleased,
    onLeftPressed,
    onLeftReleased,
    onRightPressed,
    onRightReleased,
    onSelectPressed,
    onSelectReleased,
  });

  useEffect(() => {
    initialize({ mapData, initialPosition, initialDirection });
  }, [mapData, initialDirection, initialPosition, initialize]);

  return (
    <StoreContext.Provider value={store}>
      <div className="relative overflow-hidden w-full min-h-screen max-h-screen bg-slate-700">
        <div className="relative" style={{ top: "49vh", left: "49vw" }}>
          {/* This is the player */}
          <div className="size-12 flex items-center justify-center absolute z-30">
            <Player />
          </div>
          <Grid data={mapData}></Grid>
        </div>
        <TextArea />
        <Gui />
      </div>
    </StoreContext.Provider>
  );
};
