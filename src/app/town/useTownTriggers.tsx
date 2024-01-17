import { useRouter } from "next/navigation";
import { useTriggers } from "../hooks/useTriggers";
import { mapData } from "./map";
import { CoordinateType } from "./type";

export const useTownTriggers = (position: CoordinateType) => {
  const router = useRouter();

  const triggerActionMap: Record<string, (c: CoordinateType) => void> = {
    wgmnklq: () => router.push("/123"),
  };

  useTriggers(mapData, position, triggerActionMap);
};
