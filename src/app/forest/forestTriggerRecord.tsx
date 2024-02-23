import { triggerType } from "../hooks/useTriggers";

export const forestTriggerRecord: Record<string, triggerType> = {
  i2fllay: { type: "redirect", route: "/town?prev=forest" },
};
