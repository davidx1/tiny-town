import { useContext, useEffect } from "react";
import { Cell, CoordinateType, PlotKey } from "../type.d";
import { useRouter } from "next/navigation";
import { TextareaContext } from "@/components/textarea/useTextareaContext";
import { PlotContext } from "./usePlotData";

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
  const { plot } = useContext(PlotContext);

  useEffect(() => {
    if (mapData && position) {
      const triggerId = mapData[position[0]][position[1]].triggerId;
      const triggers = triggerId ? triggerActionRecord[triggerId] : null;
      if (triggers) {
        for (const trigger of triggers) {
          if (
            !trigger.plotCondition ||
            trigger.plotCondition.every(
              (condition) => !!plot[condition.key] === condition.status,
            )
          ) {
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
          }
        }
      }
    }
  }, [mapData, position, triggerActionRecord]);
};
