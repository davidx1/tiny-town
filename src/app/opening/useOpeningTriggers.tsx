import { useRouter } from "next/navigation";
import { useTriggers } from "../hooks/useTriggers";
import { mapData } from "./map";
import { CoordinateType } from "../type";

export const useOpeningTriggers = (position: CoordinateType) => {
  const router = useRouter();

  const triggerActionMap: Record<string, (c: CoordinateType) => void> = {
    a3lvu7x: () => router.replace("/town?prev=opening", {}),
  };

  useTriggers(mapData, position, triggerActionMap);
};
