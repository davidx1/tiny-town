"use client";
import { PageView } from "@/components/pageView/PageView";
import { townInitialPositionRecord } from "./townInitialPositionRecord";
import { townTriggerRecord } from "./townTriggerRecords";
import { townConvoRecord } from "./townConvoRecords";
import {
  InventoryContext,
  useInventoryData,
} from "../../hooks/useInventoryData";
import { PlotContext, usePlotData } from "../../hooks/usePlotData";

function PageInner() {
  return (
    <PageView
      mapDataKey="town"
      initialPositionRecords={townInitialPositionRecord}
      triggerRecord={townTriggerRecord}
    />
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
