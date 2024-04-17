import { PageView } from "@/components/PageView";
import { openingInitialPositionRecord } from "./openingInitialPositionRecord";
import { openingTriggerRecord } from "./openingTriggerRecord";
import { openingConvoRecord } from "./openingConvoRecord";

export default function Page() {
  return (
    <PageView
      mapDataKey="opening"
      initialPositionRecords={openingInitialPositionRecord}
      triggerRecord={openingTriggerRecord}
      conversationRecord={openingConvoRecord}
    />
  );
}
