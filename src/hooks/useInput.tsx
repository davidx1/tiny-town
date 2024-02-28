import {
  useState,
  useRef,
  useEffect,
  KeyboardEventHandler,
  useContext,
} from "react";
import {
  Cell,
  CoordinateType,
  CommandType,
  isDirectionType,
  DirectionType,
} from "../type.d";
import { TextareaContext } from "@/components/textarea/useTextareaContext";

export interface useInputInitProp {
  mapData: Cell[][];
  initialPosition: CoordinateType;
  initialDirection: DirectionType;
  isTextAreaOpen: boolean;
}

export const useInput = ({
  mapData,
  initialPosition,
  initialDirection,
  isTextAreaOpen,
}: useInputInitProp) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [keysDown, setKeysDown] = useState<DirectionType[]>([]);
  const [position, setPosition] = useState<CoordinateType>(initialPosition);
  const [direction, setCharDirection] =
    useState<DirectionType>(initialDirection);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const directionRef = useRef<DirectionType>(initialDirection);
  const { goToNextSegment, prevOption, nextOption } =
    useContext(TextareaContext);

  useEffect(() => {
    const move = () => {
      setPosition((position) => {
        const directionDeltaMap: Record<DirectionType, [number, number]> = {
          left: [0, -1],
          up: [-1, 0],
          down: [1, 0],
          right: [0, 1],
        };
        const delta: number[] = directionDeltaMap[directionRef.current];
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
      }, 150);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isMoving]);

  useEffect(() => {
    if (isTextAreaOpen) {
      setIsMoving(false);
      setKeysDown([]);
      setTimeout(() => setCharDirection("up"), 200);
    }
  }, [isTextAreaOpen]);

  const keyMapping: Record<string, CommandType> = {
    KeyA: "left",
    KeyW: "up",
    KeyS: "down",
    KeyD: "right",
    ArrowUp: "up",
    ArrowLeft: "left",
    ArrowDown: "down",
    ArrowRight: "right",
    Enter: "confirm",
    Space: "confirm",
    Escape: "cancel",
  };

  const onKeyDownDirection: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const newCommand = keyMapping[e.code];

    if (isDirectionType(newCommand) && !keysDown.includes(newCommand)) {
      setKeysDown([...keysDown, newCommand]);
      directionRef.current = newCommand;
      setIsMoving(true);
    }
  };

  const onKeyUpDirection: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const commandReleased = keyMapping[e.code];

    const newKeysDown = keysDown.filter((k) => k !== commandReleased);
    if (newKeysDown.length === 0) {
      setIsMoving(false);
    } else if (isDirectionType(commandReleased)) {
      directionRef.current = newKeysDown[newKeysDown.length - 1];
    }
    setKeysDown(newKeysDown);
  };

  const onKeyDownTextArea: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const newCommand = keyMapping[e.code];
    switch (newCommand) {
      case "confirm":
        return goToNextSegment();
      case "up":
        return prevOption();
      case "down":
        return nextOption();
      default:
        return;
    }
  };
  const onKeyUpTextArea: KeyboardEventHandler<HTMLDivElement> = () => {};

  const onKeyDown = isTextAreaOpen ? onKeyDownTextArea : onKeyDownDirection;
  const onKeyUp = isTextAreaOpen ? onKeyUpTextArea : onKeyUpDirection;

  return { isMoving, direction, position, onKeyDown, onKeyUp };
};
