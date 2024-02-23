"use client";
import { PageView } from "@/components/pageView/PageView";
import { forestInitialPositionRecord } from "./forestInitialPositionRecord";
import { forestTriggerRecord } from "./forestTriggerRecord";
import {
  TextareaContext,
  useTextarea,
} from "@/components/textarea/useTextareaContext";
import { forestConvoRecord } from "./forestConvoRecord";
import { InventoryContext, useInventoryData } from "../hooks/useInventoryData";
import { usePlotData, PlotContext } from "../hooks/usePlotData";

function PageInner() {
  const textareaValue = useTextarea(forestConvoRecord);
  return (
    <TextareaContext.Provider value={textareaValue}>
      <PageView
        mapDataKey="forest"
        initialPositionRecords={forestInitialPositionRecord}
        triggerRecord={forestTriggerRecord}
      />
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
