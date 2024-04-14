"use client";
import { PageView } from "@/components/pageView/PageView";
import { openingInitialPositionRecord } from "./openingInitialPositionRecord";
import { openingTriggerRecord } from "./openingTriggerRecord";
import { openingConvoRecord } from "./openingConvoRecord";

export default function Page() {
  return (
    <PageView
      mapDataKey="opening"
      initialPositionRecords={openingInitialPositionRecord}
      triggerRecord={openingTriggerRecord}
      convoRecord={openingConvoRecord}
    />
  );
}
