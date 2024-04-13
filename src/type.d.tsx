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
  comp: { name: string; anchor: CoordinateType; options?: any } | null;
};

export interface FeatureType {
  anchor: CoordinateType;
  footprint: number[][];
  name: string;
}

export type GestureKey = "gesture-paper" | "gesture-rock" | "gesture-scissors";
export type ItemKey = GestureKey;
export type InventoryType = Record<ItemKey, number>;

export type PlotKey =
  | "viewed-controls"
  | "talked-to-professor"
  | "collected-rock"
  | "collected-paper"
  | "collected-scissors"
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

export interface BattleGesture {
  name: GestureKey;
  hp: number;
}

export enum BattleStates {
  PREP_ADD,
  PREP_REMOVE,
  PREP_READY,
  SELECT_GESTURE,
  GESTURE_REVEAL,
  HEALTH_CHANGE,
  RESULT,
}

// Actions
export type BattleActions =
  | { type: "select" }
  | { type: "cursor_up" }
  | { type: "cursor_down" }
  | { type: "cursor_left" }
  | { type: "cursor_right" }
  | { type: "internal_continue" };

export interface BattleGameState {
  state: BattleStates;
  playerReserveGestures: [GestureKey, number][];
  playerBattleGestures: BattleGesture[];
  playerPlayedGestureIndex: number;
  aiBattleGestures: BattleGesture[];
  aiPlayedGestureIndex: number;
  cursorIndex: number;
}

export type BattleIds = "spiky-hair0" | "blond-hair0" | "silver-hair0";

export type BattleStrategiesKey =
  | "first-available"
  | "random"
  | "random-advantage"
  | "amplified-probability";
