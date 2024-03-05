import { useContext, useEffect } from "react";
import { Cell, CoordinateType, PlotKey } from "../type.d";
import { useRouter } from "next/navigation";
import { TextareaContext } from "@/components/textarea/useTextareaContext";

type redirectTriggerType = {
  type: "redirect";
  route: string;
  plotCondition?: { key: PlotKey; status: boolean }[];
};
type conversationTriggerType = {
  type: "conversation";
  key: string;
  plotCondition?: { key: PlotKey; status: boolean }[];
};
export type triggerType = (redirectTriggerType | conversationTriggerType)[];

export const useTriggers = (
  mapData: Cell[][],
  position: CoordinateType,
  triggerActionRecord: Record<string, triggerType>,
) => {
  const router = useRouter();
  const { initConversation } = useContext(TextareaContext);

  useEffect(() => {
    if (mapData && position) {
      const triggerId = mapData[position[0]][position[1]].triggerId;
      const triggers = triggerId ? triggerActionRecord[triggerId] : null;
      for (const trigger of triggers) {
        if (trigger) {
          switch (trigger.type) {
            case "redirect":
              router.replace(trigger.route);
              return;
            case "conversation":
              initConversation(trigger.key);
              return;
            default:
              return;
          }
          break;
        }
      }
    }
  }, [mapData, position, triggerActionRecord]);
};
