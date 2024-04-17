import { triggerType } from "@/type.d";

export const townTriggerRecord: Record<string, triggerType[]> = {
  wgmnklq: [{ type: "redirect", route: `/opening?prev=town` }],
  kjjdb61: [
    {
      type: "conversation",
      key: "forest-missing-knowledge",
      plotCondition: [{ key: "talked-to-professor", status: false }],
    },
    {
      type: "redirect",
      route: `/forest?prev=town`,
      plotCondition: [
        { key: "collected-rock", status: true },
        { key: "collected-scissors", status: true },
        { key: "collected-paper", status: true },
      ],
    },
    {
      type: "conversation",
      key: "forest-missing-gesture",
    },
  ],
  k57e2xc: [{ type: "conversation", key: "doctor" }],
  ok03qvx: [{ type: "conversation", key: "fisherman" }],
  b3d22oy: [{ type: "conversation", key: "shopkeeper" }],
};
