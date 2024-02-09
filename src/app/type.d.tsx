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

export type TextRecord = Record<string, Conversation>;
export type Conversation = Record<string, Segment>;
export type Segment = ConversationPassiveText | ConversationUserSelection;
export type ConversationPassiveText = {
  label: string;
  next: string | null;
};

export type ConversationUserSelection = {
  label: string;
  options: ConversationOption[];
};

export type ConversationOption = {
  optionLabel: string;
  next: string | null;
};
