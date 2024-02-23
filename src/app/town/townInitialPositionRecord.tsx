import { InitialPositionRecord } from "../hooks/useInitialPosition";

export const townInitialPositionRecord: InitialPositionRecord = {
  opening: {
    initialPosition: [33, 23],
    initialDirection: "up",
  },
  forest: {
    initialPosition: [1, 35],
    initialDirection: "down",
  },
  default: {
    initialPosition: [16, 25],
    initialDirection: "right",
  },
};
