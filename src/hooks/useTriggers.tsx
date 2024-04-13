import { useContext, useEffect } from "react";
import { PlotKey } from "../type.d";
import { PlotContext } from "./usePlotData";
import { autorun } from "mobx";
import { store } from "@/stores/rootStore";

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

export const useTriggers = (triggerRecord: Record<string, triggerType>) => {
  const { plot } = useContext(PlotContext);

  useEffect(() => {
    const disposer = autorun(() => {
      const { mapData, position } = store.moveStore;
      if (mapData && position) {
        store.converseStore.setConverseIcon(false);
        const triggerId = mapData[position[0]][position[1]].triggerId;
        const triggers = triggerId ? triggerRecord[triggerId] : null;
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
                  window.location.replace(trigger.route);
                  return;
                case "conversation":
                  store.converseStore.setConverseIcon(true);
                default:
                  return;
              }
            }
          }
        }
      }
    });

    return () => disposer();
  }, []);
};
