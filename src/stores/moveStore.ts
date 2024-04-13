import { triggerType } from "@/hooks/useTriggers";
import { Cell, CoordinateType, DirectionType } from "@/type.d";
import { makeAutoObservable } from "mobx";

const directionDeltaMap: Record<DirectionType, [number, number]> = {
  left: [0, -1],
  up: [-1, 0],
  down: [1, 0],
  right: [0, 1],
};

export class MoveStore {
  count = 1;
  rootStore: any;
  mapData?: Cell[][];
  position?: CoordinateType;
  direction?: DirectionType;
  keysDown: DirectionType[];
  movingRef: NodeJS.Timeout | null = null;
  triggerRecord: Record<string, triggerType> | null = null;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this.keysDown = [];
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLoading() {
    return !this.mapData || !this.position || !this.direction;
  }

  get isMoving() {
    return !!this.keysDown.length;
  }

  move = () => {
    const newDirection = this.keysDown[this.keysDown.length - 1];
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
        if (!this.keysDown.length && this.movingRef) {
          clearInterval(this.movingRef);
          this.movingRef = null;
        } else {
          this.move();
        }
      }, 200);
    }
  };

  onDirectionPressed = (newDirection: DirectionType) => {
    if (!this.keysDown.includes(newDirection)) {
      this.keysDown.push(newDirection);
      this.updatePosition();
    }
  };

  onDirectionReleased = (releasedDirection: DirectionType) => {
    if (this.keysDown.includes(releasedDirection)) {
      this.keysDown = this.keysDown.filter(
        (keys) => keys !== releasedDirection,
      );
    }
  };

  onUpPressed = () => this.onDirectionPressed("up");
  onUpReleased = () => this.onDirectionReleased("up");
  onDownPressed = () => this.onDirectionPressed("down");
  onDownReleased = () => this.onDirectionReleased("down");
  onLeftPressed = () => this.onDirectionPressed("left");
  onLeftReleased = () => this.onDirectionReleased("left");
  onRightPressed = () => this.onDirectionPressed("right");
  onRightReleased = () => this.onDirectionReleased("right");

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
                !!this.rootStore.plot[condition.key] === condition.status,
            ))
        ) {
          this.rootStore.setMode("converseStore");
          this.direction = "up";
          return;
        }
      }
    }
  };
  onSelectReleased = () => {};
}
