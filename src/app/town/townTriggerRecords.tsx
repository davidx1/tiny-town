import { triggerType } from "../../hooks/useTriggers";

export const townTriggerRecord: Record<string, triggerType | triggerType[]> = {
  wgmnklq: [
    { type: "redirect", route: `/opening?prev=town`, plotCondition: [] },
    { type: "conversation", key: "doctor" },
  ],
  kjjdb61: [
    { type: "redirect", route: `/forest?prev=town`, plotCondition: [] },
    { type: "conversation", key: "doctor" },
  ],
  k57e2xc: [{ type: "conversation", key: "doctor" }],
  ok03qvx: [{ type: "conversation", key: "fisherman" }],
  b3d22oy: [{ type: "conversation", key: "shopkeeper" }],
};
