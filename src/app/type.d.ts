export type DirectionType = "left" | "right" | "up" | "down";
export type CoordinateType = [number, number];
export type InitialCoDirType = {
  initialPosition: CoordinateType;
  initialDirection: DirectionType;
};
export type Cell = {
  occupierId: string | null;
  triggerId: string | null;
  groundType: "grass" | "path";
  comp: { name: string; anchor: CoordinateType } | null;
};

export interface FeatureType {
  anchor: CoordinateType;
  footprint: number[][];
  name: string;
}
