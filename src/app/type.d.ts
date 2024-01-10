export type DirectionType = "left" | "right" | "up" | "down";
export type CoordinateType = [number, number];
export type Cell = {
  occupierId: string | null;
  groundType: "grass" | "path";
  comp: { name: string; anchor: CoordinateType } | null;
};

export interface FeatureType {
  anchor: CoordinateType;
  footprint: number[][];
  name: string;
}
