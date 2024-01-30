import { useState, useRef, useEffect, KeyboardEventHandler } from "react";
import { Cell, CoordinateType, CommandType } from "../type";

export interface useInputInitProp {
  mapData: Cell[][];
  initialPosition: CoordinateType;
  initialDirection: CommandType;
}

export const useInput = ({
  mapData,
  initialPosition,
  initialDirection,
}: useInputInitProp) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [keysDown, setKeysDown] = useState<CommandType[]>([]);
  const [position, setPosition] = useState<CoordinateType>(initialPosition);
  const [direction, setCharDirection] = useState<CommandType>(initialDirection);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const directionRef = useRef<CommandType>(initialDirection);

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
      }, 115);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isMoving]);

  const keyMapping: Record<string, CommandType> = {
    a: "left",
    w: "up",
    s: "down",
    d: "right",
    ArrowUp: "up",
    ArrowLeft: "left",
    ArrowDown: "down",
    ArrowRight: "right",
    e: "activate",
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const newDirection = keyMapping[e.key];

    if (newDirection && !keysDown.includes(newDirection)) {
      setKeysDown([...keysDown, newDirection]);
      directionRef.current = newDirection;
      setIsMoving(true);
    }
  };

  const onKeyUp: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const directionReleased = keyMapping[e.key];
    const newKeysDown = keysDown.filter((k) => k !== directionReleased);
    if (newKeysDown.length === 0) {
      setIsMoving(false);
    } else {
      directionRef.current = newKeysDown[newKeysDown.length - 1];
    }

    setKeysDown(newKeysDown);
  };

  return { isMoving, direction, position, onKeyDown, onKeyUp };
};
