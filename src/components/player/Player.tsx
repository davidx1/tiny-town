import { CommandType } from "@/app/type.d";
import { useEffect, useRef, useState } from "react";

interface PlayerProps {
  direction: CommandType;
  isMoving?: boolean;
}

export default function Player({ direction, isMoving }: PlayerProps) {
  const timingRef = useRef<NodeJS.Timeout>();
  const [moveOffset, setMoveOffset] = useState<number>(-8);
  const directionIconMap = {
    left: "-64px",
    right: "-128px",
    up: "-196px",
    down: "0px",
  };

  useEffect(() => {
    if (isMoving) {
      setMoveOffset((currentOffset) => currentOffset - 64);
      timingRef.current = setInterval(() => {
        setMoveOffset((currentOffset) => currentOffset - 64);
      }, 200);
    } else {
      clearInterval(timingRef.current);
      setMoveOffset(-8);
    }
  }, [isMoving]);

  return (
    <div className="size-12 flex items-center justify-center absolute z-30">
      <div
        className="bg-char1-set w-12 h-16 "
        style={{
          backgroundPosition: `${moveOffset}px ${directionIconMap[direction]}`,
        }}
      ></div>
    </div>
  );
}
