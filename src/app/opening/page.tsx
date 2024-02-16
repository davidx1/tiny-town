"use client";
import { PageView } from "@/components/pageView/PageView";
import { openingInitialPositionRecord } from "./openingInitialPositionRecord";
import { openingTriggerRecord } from "./openingTriggerRecord";
import {
  TextareaContext,
  useTextarea,
} from "@/components/textarea/useTextareaContext";
import { openingConvoRecord } from "./openingConvoRecord";
import { InventoryContext, useInventoryData } from "../hooks/useInventoryData";

export default function Home() {
  const textareaValue = useTextarea(openingConvoRecord);
  const inventoryValue = useInventoryData();

  return (
    <InventoryContext.Provider value={inventoryValue}>
      <TextareaContext.Provider value={textareaValue}>
        <PageView
          mapDataKey="opening"
          initialPositionRecords={openingInitialPositionRecord}
          triggerRecord={openingTriggerRecord}
        />
      </TextareaContext.Provider>
    </InventoryContext.Provider>
  );
}
