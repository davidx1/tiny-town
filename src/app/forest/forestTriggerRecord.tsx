import { triggerType } from "../../hooks/useTriggers";

export const forestTriggerRecord: Record<string, triggerType> = {
  i2fllay: { type: "redirect", route: "/town?prev=forest" },
  jbhkfz1: {
    type: "redirect",
    route: "/battle?id=spiky-hair0&strat=first-available&prev=forest",
  },
  mpamoot: {
    type: "redirect",
    route: "/battle?id=blond-hair0&strat=random&prev=forest",
  },
  y8ez2p1: {
    type: "redirect",
    route: "/battle?id=silver-hair0&strat=amplified-probability&prev=forest",
  },
};
