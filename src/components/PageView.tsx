"use client";

import { mapKeys, useMapData } from "@/hooks/useMapData";
import Grid from "@/components/Grid";
import { TextArea } from "@/components/TextArea";
import { useEffect } from "react";
import { Gui } from "./Gui";
import { useInput } from "@/hooks/useInput";
import { Player } from "./Player";
import { StoreContext, store } from "@/stores/rootStore";
import { isMobile } from "react-device-detect";
import { Conversation, triggerType, InitialPositionRecord } from "@/type.d";
import { MobileUnsupported } from "./MobileUnsupported";
import { ControlsHint } from "./ControlsHint";
import { useSearchParams } from "next/navigation";
import { useTriggers } from "@/hooks/useTriggers";

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

  const prev = useSearchParams().get("prev");
  const { initialPosition, initialDirection } =
    initialPositionRecords?.[prev] || initialPositionRecords.default;

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
