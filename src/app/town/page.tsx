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

export default function Home() {
  const textareaValue = useTextarea(townConvoRecord);
  const inventoryValue = useInventoryData();
  return (
    <InventoryContext.Provider value={inventoryValue}>
      <TextareaContext.Provider value={textareaValue}>
        <PageView
          mapDataKey="town"
          initialPositionRecords={townInitialPositionRecord}
          triggerRecord={townTriggerRecord}
        />
      </TextareaContext.Provider>
    </InventoryContext.Provider>
  );
}
