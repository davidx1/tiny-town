"use client";
import { PageView } from "@/components/pageView/PageView";
import { townInitialPositionRecord } from "./townInitialPositionRecord";
import { townTriggerRecord } from "./townTriggerRecords";
import {
  TextareaContext,
  useTextarea,
} from "@/components/textarea/useTextareaContext";
import { townConvoRecord } from "./townConvoRecords";

export default function Home() {
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
