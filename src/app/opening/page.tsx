"use client";
import { PageView } from "@/components/pageView/PageView";
import { openingInitialPositionRecord } from "./openingInitialPositionRecord";
import { openingTriggerRecord } from "./openingTriggerRecord";
import {
  InventoryContext,
  useInventoryData,
} from "../../hooks/useInventoryData";
import { usePlotData, PlotContext } from "../../hooks/usePlotData";
import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

function PageInner() {
  const { plot, reachedPlotPoint, isLoading } = useContext(PlotContext);
  const [showControl, setShowControl] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      setShowControl(!plot["viewed-controls"]);
      if (!plot["viewed-controls"]) {
        setTimeout(() => {
          setShowControl(false);
          reachedPlotPoint("viewed-controls");
        }, 5000);
      }
    }
  }, [isLoading]);

  return (
    <>
      <PageView
        mapDataKey="opening"
        initialPositionRecords={openingInitialPositionRecord}
        triggerRecord={openingTriggerRecord}
      />
      {showControl && !isMobile && (
        <div className="bg-gray-800/80 absolute w-1/2 aspect-3/2 z-40 top-1/4 left-1/4 p-8">
          <div className="h-full bg-control-instruction bg-cover"></div>
        </div>
      )}
      {isMobile && (
        <div className="bg-gray-800/80 absolute w-2/3 z-40 top-1/3 left-1/6 px-8 py-8 flex flex-col items-center text-center">
          <h1 className="text-white text-xl mb-4">Device Unsupported</h1>
          <p className="text-gray-200">
            Mobile devices are not supported yet. Please try again on a
            computer.
          </p>
        </div>
      )}
    </>
  );
}

export default function Page() {
  const plotValue = usePlotData();
  const inventoryValue = useInventoryData();

  return (
    <PlotContext.Provider value={plotValue}>
      <InventoryContext.Provider value={inventoryValue}>
        <PageInner />
      </InventoryContext.Provider>
    </PlotContext.Provider>
  );
}
