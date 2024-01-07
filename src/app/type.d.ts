export type DirectionType = "left" | "right" | "up" | "down";
export type CoordinateType = [number, number];
export type Cell = {
  isFree: boolean;
  groundType: "grass" | "path";
  occupiedComp: { comp: React.ReactNode; anchor: CoordinateType } | null;
};
