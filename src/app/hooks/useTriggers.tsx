import { useEffect } from "react";
import { Cell, CoordinateType } from "../type";

export const useTriggers = (
  mapData: Cell[][],
  position: CoordinateType,
  triggerActionMap: Record<string, (c: CoordinateType) => void>,
) => {
  useEffect(() => {
    const triggerId = mapData[position[0]][position[1]].triggerId;
    if (triggerId) {
      triggerActionMap[triggerId](position);
    }
  }, [mapData, position, triggerActionMap]);
};
