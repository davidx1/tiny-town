import { useEffect } from "react";
import { Cell, CoordinateType } from "../town/type";

export const useTriggers = (
  mapData: Cell[][],
  position: CoordinateType,
  triggerActionMap: Record<string, (c: CoordinateType) => void>,
) => {
  useEffect(() => {
    const triggerId = mapData[position[0]][position[1]].triggerId;
    if (triggerId) {
      setTimeout(() => {
        triggerActionMap[triggerId](position);
      }, 90);
    }
  }, [mapData, position, triggerActionMap]);
};
