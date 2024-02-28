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

function PageInner() {
  const textareaValue = useTextarea(openingConvoRecord);
  return (
    <TextareaContext.Provider value={textareaValue}>
      <PageView
        mapDataKey="opening"
        initialPositionRecords={openingInitialPositionRecord}
        triggerRecord={openingTriggerRecord}
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
