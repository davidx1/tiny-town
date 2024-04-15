"use client";

import {
  InitialPositionRecord,
  useInitialPosition,
} from "@/hooks/useInitialPosition";
import { mapKeys, useMapData } from "@/hooks/useMapData";
import Grid from "@/components/grid/Grid";
import { TextArea } from "@/components/textarea/TextArea";
import { useEffect } from "react";
import { Gui } from "../gui/Gui";
import { useInput } from "@/hooks/useInput";
import { Player } from "../character/Player";
import { StoreContext, store } from "@/stores/rootStore";
import { triggerType, useTriggers } from "@/hooks/useTriggers";
import { isMobile } from "react-device-detect";
import { Conversation, CoordinateType } from "@/type.d";
import { MobileUnsupported } from "./MobileUnsupported";
import { ControlsHint } from "./ControlsHint";

interface PageViewProps {
  mapDataKey: mapKeys;
  initialPositionRecords: InitialPositionRecord;
  triggerRecord: Record<string, triggerType[]>;
  conversationRecord: Record<string, Conversation>;
}

export const PageView = ({
  mapDataKey,
  initialPositionRecords,
  triggerRecord,
  conversationRecord,
}: PageViewProps) => {
  const { mapData } = useMapData(mapDataKey);
  const { initialPosition, initialDirection } = useInitialPosition(
    initialPositionRecords,
  );
  const { onKeyPressed, onKeyReleased, initialize } = store;
  useInput({ onKeyPressed, onKeyReleased });

  useEffect(() => {
    initialize({
      mapData,
      initialPosition,
      initialDirection,
      triggerRecord,
      conversationRecord,
    });
  }, [
    mapData,
    initialDirection,
    initialPosition,
    initialize,
    triggerRecord,
    conversationRecord,
  ]);

  useTriggers();

  // const { plot, reachedPlotPoint, isLoading } = useContext(PlotContext);

  return (
    <StoreContext.Provider value={store}>
      <div className="relative overflow-hidden w-full min-h-screen max-h-screen bg-slate-700">
        <div className="relative" style={{ top: "49vh", left: "49vw" }}>
          <Player />
          <Grid data={mapData}></Grid>
        </div>
        <TextArea />
        <Gui />
      </div>
      {isMobile && <MobileUnsupported />}
      {!isMobile && <ControlsHint />}
    </StoreContext.Provider>
  );
};
