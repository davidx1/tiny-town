"use client";
import { PageView } from "@/components/pageView/PageView";
import { openingInitialPositionRecord } from "./openingInitialPositionRecord";
import { openingTriggerRecord } from "./openingTriggerRecord";
import {
  TextareaContext,
  useTextarea,
} from "@/components/textarea/useTextareaContext";
import { openingConvoRecord } from "./openingConvoRecord";
import {
  InventoryContext,
  useInventoryData,
} from "../../hooks/useInventoryData";
import { usePlotData, PlotContext } from "../../hooks/usePlotData";
import { useEffect, useState } from "react";

function PageInner() {
  const textareaValue = useTextarea(openingConvoRecord);
  const [showControl, setShowControl] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowControl(false);
    }, 3000);
  }, []);

  return (
    <TextareaContext.Provider value={textareaValue}>
      <PageView
        mapDataKey="opening"
        initialPositionRecords={openingInitialPositionRecord}
        triggerRecord={openingTriggerRecord}
      />
      {showControl && (
        <div className="bg-gray-800/80 absolute w-1/2 aspect-3/2 z-40 top-1/4 left-1/4 p-8">
          <div className="h-full bg-control-instruction bg-cover"></div>
        </div>
      )}
    </TextareaContext.Provider>
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
