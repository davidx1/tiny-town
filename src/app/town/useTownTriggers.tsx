import { useRouter } from "next/navigation";
import { useTriggers } from "../hooks/useTriggers";
import { mapData } from "./map";
import { CoordinateType } from "../type";

export const useTownTriggers = (position: CoordinateType) => {
  const router = useRouter();
  const prev = "prev=town";

  const triggerActionMap: Record<string, (c: CoordinateType) => void> = {
    wgmnklq: () => router.push(`/opening?${prev}`),
  };

  useTriggers(mapData, position, triggerActionMap);
};
