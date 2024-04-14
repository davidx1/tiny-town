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
  // const [showControl, setShowControl] = useState<boolean>(false);

  // useEffect(() => {
  //   if (!isLoading) {
  //     setShowControl(!plot["viewed-controls"]);
  //     if (!plot["viewed-controls"]) {
  //       setTimeout(() => {
  //         setShowControl(false);
  //         reachedPlotPoint("viewed-controls");
  //       }, 5000);
  //     }
  //   }
  // }, [isLoading]);

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
      {isMobile && (
        <div className="bg-gray-800/80 absolute w-2/3 z-40 top-1/3 left-1/6 px-8 py-8 flex flex-col items-center text-center">
          <h1 className="text-white text-xl mb-4">Device Unsupported</h1>
          <p className="text-gray-200">
            Mobile devices are not supported yet. Please try again on a
            computer.
          </p>
        </div>
      )}
      {/* {showControl && !isMobile && (
        <div className="bg-gray-800/80 absolute w-1/2 aspect-3/2 z-40 top-1/4 left-1/4 p-8">
          <div className="h-full bg-control-instruction bg-cover"></div>
        </div>
      )}*/}
    </StoreContext.Provider>
  );
};
