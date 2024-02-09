"use client";
import { PageView } from "@/components/pageView/PageView";
import { openingInitialPositionRecord } from "./openingInitialPositionRecord";
import { openingTriggerRecord } from "./openingTriggerRecord";
import {
  TextareaContext,
  useTextarea,
} from "@/components/textarea/useTextareaContext";
import { openingConvoRecord } from "./openingConvoRecord";

export default function Home() {
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
