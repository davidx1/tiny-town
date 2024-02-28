import { useSearchParams } from "next/navigation";
import { InitialCoDirType } from "../type.d";

export type InitialPositionRecord = Record<string, InitialCoDirType> & {
  default: InitialCoDirType;
};

export const useInitialPosition = (
  positionMap: InitialPositionRecord,
): InitialCoDirType => {
  const searchParams = useSearchParams();
  const prev = searchParams.get("prev");
  return (prev && positionMap?.[prev]) || positionMap.default;
};
