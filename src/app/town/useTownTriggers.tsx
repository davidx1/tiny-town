import { useRouter } from "next/navigation";
import { useTriggers } from "../hooks/useTriggers";
import { mapData } from "./map";
import { CoordinateType } from "../type";

const useConversation = () => {
  const init = () => {};
  return { init };
};

export const useTownTriggers = (position: CoordinateType) => {
  const router = useRouter();
  const convo = useConversation();
  const prev = "prev=town";

  const triggerActionMap: Record<string, (c: CoordinateType) => void> = {
    wgmnklq: () => router.replace(`/opening?${prev}`),
    rsn336m: () => convo.init("123"),
  };

  useTriggers(mapData, position, triggerActionMap);
};
