import { PageView } from "@/components/PageView";
import { townInitialPositionRecord } from "./townInitialPositionRecord";
import { townTriggerRecord } from "./townTriggerRecords";
import { townConvoRecord } from "./townConvoRecords";

export default function Page() {
  return (
    <PageView
      mapDataKey="town"
      initialPositionRecords={townInitialPositionRecord}
      triggerRecord={townTriggerRecord}
      conversationRecord={townConvoRecord}
    />
  );
}
