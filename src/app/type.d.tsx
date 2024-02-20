export type DirectionType = "left" | "right" | "up" | "down";

export function isDirectionType(variable: any): variable is DirectionType {
  return ["left", "right", "up", "down"].includes(variable);
}

export type ActionType = "confirm" | "cancel";
export type CommandType = DirectionType | ActionType;
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

export type ItemKey = "gesture-paper" | "gesture-rock" | "gesture-scissors";
export type InventoryType = Record<ItemKey, number>;

export type PlotKey =
  | "talked-to-professor"
  | "collected-rock"
  | "collected-paper"
  | "collected-scissor"
  | "fought-first-battle";
export type PlotType = Record<PlotKey, boolean>;

export type TextRecord = Record<string, Conversation>;
export type Conversation = Record<string, Segment>;
export type Segment = SegmentPassive | SegmentWSelection;

type SegmentBase = {
  label: string;
  itemAction?: {
    type: "add" | "remove";
    key: ItemKey;
    count?: number;
  };
  reachedPlotPoint?: PlotKey;
};
export interface SegmentPassive extends SegmentBase {
  next: string | null;
}

export interface SegmentWSelection extends SegmentBase {
  label: string;
  options: ConversationOption[];
}

export type ConversationOption = {
  plotCondition?: { key: PlotKey; status: boolean }[];
  optionLabel: string;
  next: string | null;
};
