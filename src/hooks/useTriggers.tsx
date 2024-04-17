import { useEffect } from "react";
import { autorun } from "mobx";
import { store } from "@/stores/rootStore";

export const useTriggers = () => {
  useEffect(() => {
    const disposer = autorun(() => {
      const {
        moveStore: { mapData, position, triggerRecord },
        plotStore: { plot },
      } = store;

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
                  store.mode = null;
                  store.moveStore.directionKeysDown = [];
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
