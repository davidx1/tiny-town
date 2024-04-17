import {
  Cell,
  CoordinateType,
  DirectionType,
  DirectionInput,
  isDirectionInput,
  isSelectionInput,
  triggerType,
} from "@/type.d";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

const directionDeltaMap: Record<DirectionType, [number, number]> = {
  left: [0, -1],
  up: [-1, 0],
  down: [1, 0],
  right: [0, 1],
};

const directionInputDirectionMap: Record<DirectionInput, DirectionType> = {
  KeyA: "left",
  KeyW: "up",
  KeyS: "down",
  KeyD: "right",
};

export class MoveStore {
  count = 1;
  rootStore: any;
  mapData?: Cell[][];
  position?: CoordinateType;
  direction?: DirectionType;
  directionKeysDown: DirectionInput[];
  movingRef: NodeJS.Timeout | null = null;
  triggerRecord: Record<string, triggerType[]> | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.directionKeysDown = [];
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLoading() {
    return !this.mapData || !this.position || !this.direction;
  }

  get isMoving() {
    return !!this.directionKeysDown.length;
  }

  onKeyPressed = (key: string) => {
    if (isDirectionInput(key)) {
      this.onDirectionPressed(key);
    } else if (isSelectionInput(key)) {
      this.onSelectPressed();
    }
  };

  onKeyReleased = (key: string) => {
    if (isDirectionInput(key)) {
      this.onDirectionReleased(key);
    }
  };

  move = () => {
    const newDirectionInput =
      this.directionKeysDown[this.directionKeysDown.length - 1];
    const newDirection = directionInputDirectionMap[newDirectionInput];
    if (newDirection && this.position && this.mapData) {
      const delta: CoordinateType = directionDeltaMap[newDirection];
      const newPos: CoordinateType = [
        this.position[0] + delta[0],
        this.position[1] + delta[1],
      ];
      this.direction = newDirection;
      this.position =
        this.mapData[newPos[0]]?.[newPos[1]]?.occupierId === null
          ? newPos
          : this.position;
    }
  };

  updatePosition = () => {
    if (!this.movingRef) {
      this.move();
      this.movingRef = setInterval(() => {
        if (!this.directionKeysDown.length && this.movingRef) {
          clearInterval(this.movingRef);
          this.movingRef = null;
        } else {
          this.move();
        }
      }, 200);
    }
  };

  onDirectionPressed = (newDirection: DirectionInput) => {
    if (!this.directionKeysDown.includes(newDirection)) {
      this.directionKeysDown.push(newDirection);
      this.updatePosition();
    }
  };

  onDirectionReleased = (releasedDirection: DirectionInput) => {
    if (this.directionKeysDown.includes(releasedDirection)) {
      this.directionKeysDown = this.directionKeysDown.filter(
        (keys) => keys !== releasedDirection,
      );
    }
  };

  onSelectPressed = () => {
    const { mapData, position, triggerRecord } = this;
    if (mapData && position && triggerRecord) {
      const triggerId = mapData[position[0]][position[1]].triggerId;
      const triggers = triggerId ? triggerRecord[triggerId] : [];
      for (const trigger of triggers) {
        if (
          trigger.type === "conversation" &&
          (!trigger.plotCondition ||
            trigger.plotCondition.every(
              (condition) =>
                !!this.rootStore.plotStore.plot[condition.key] ===
                condition.status,
            ))
        ) {
          this.rootStore.converseStore.startConversation(trigger.key);
          this.direction = "up";
          this.directionKeysDown = [];
          break;
        }
      }
    }
  };
  onSelectReleased = () => {};
}
