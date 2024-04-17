import { PageView } from "@/components/PageView";
import { forestInitialPositionRecord } from "./forestInitialPositionRecord";
import { forestTriggerRecord } from "./forestTriggerRecord";

export default function Page() {
  return (
    <PageView
      mapDataKey="forest"
      initialPositionRecords={forestInitialPositionRecord}
      triggerRecord={forestTriggerRecord}
      conversationRecord={undefined}
    />
  );
}
