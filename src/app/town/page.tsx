"use client";
import { PageView } from "@/components/pageView/PageView";
import { townInitialPositionRecord } from "./townInitialPositionRecord";
import { townTriggerRecord } from "./townTriggerRecords";
import {
  TextareaContext,
  useTextarea,
} from "@/components/textarea/useTextareaContext";
import { townConvoRecord } from "./townConvoRecords";
import { InventoryContext, useInventoryData } from "../hooks/useInventoryData";
import { PlotContext, usePlotData } from "../hooks/usePlotData";

export function HomeLayer2() {
  const textareaValue = useTextarea(townConvoRecord);
  return (
    <TextareaContext.Provider value={textareaValue}>
      <PageView
        mapDataKey="town"
        initialPositionRecords={townInitialPositionRecord}
        triggerRecord={townTriggerRecord}
      />
    </TextareaContext.Provider>
  );
}

export default function Home() {
  const plotValue = usePlotData();
  const inventoryValue = useInventoryData();

  return (
    <PlotContext.Provider value={plotValue}>
      <InventoryContext.Provider value={inventoryValue}>
        <HomeLayer2 />
      </InventoryContext.Provider>
    </PlotContext.Provider>
  );
}
