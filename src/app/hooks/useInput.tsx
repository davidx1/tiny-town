import { useState, useRef, useEffect, KeyboardEventHandler } from "react";
import { Cell, CoordinateType, DirectionType } from "../type";

export interface useInputInitProp {
  mapData: Cell[][];
  initialPosition: CoordinateType;
}

export const useInput = ({ mapData, initialPosition }: useInputInitProp) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [keyDownCount, setKeyDownCount] = useState<number>(0);
  const [position, setPosition] = useState<CoordinateType>(initialPosition);
  const [direction, setCharDirection] = useState<DirectionType>("left");
  const timeoutRef = useRef<NodeJS.Timeout>();
  const directionRef = useRef<DirectionType>("left");

  useEffect(() => {
    const move = () => {
      setPosition((position) => {
        const directionDeltaMap = {
          left: [0, -1],
          up: [-1, 0],
          down: [1, 0],
          right: [0, 1],
        };
        const delta = directionDeltaMap[directionRef.current];
        const newPosition: CoordinateType = [
          position[0] + delta[0],
          position[1] + delta[1],
        ];
        setCharDirection(directionRef.current);
        return mapData[newPosition[0]]?.[newPosition[1]]?.occupierId === null
          ? newPosition
          : position;
      });
    };
    if (isMoving) {
      move();
      timeoutRef.current = setInterval(() => {
        move();
      }, 165);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isMoving]);

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const keyMapping: Record<string, DirectionType> = {
      a: "left",
      w: "up",
      s: "down",
      d: "right",
    };

    if (!e.repeat) {
      setKeyDownCount(keyDownCount + 1);
      directionRef.current = keyMapping[e.key] || "left";
      setIsMoving(true);
    }
  };

  const onKeyUp: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (keyDownCount === 1) {
      setIsMoving(false);
    }
    setKeyDownCount(keyDownCount - 1);
  };

  return { isMoving, direction, position, onKeyDown, onKeyUp };
};
