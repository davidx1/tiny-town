import { DirectionType } from "@/type.d";
import { useEffect, useRef, useState } from "react";

interface CharacterAnimationProps {
  direction?: DirectionType;
  isMoving?: boolean;
}

type CharacterProp = CharacterAnimationProps & { characterBgClass: string };

export default function Character({
  direction = "down",
  isMoving = false,
  characterBgClass,
}: CharacterProp) {
  const { moveOffset, directionOffset } = useCharacterAnimation({
    direction,
    isMoving,
  });

  return (
    <div
      className={`${characterBgClass} w-12 h-16`}
      style={{
        backgroundPosition: `${moveOffset}px ${directionOffset}px`,
      }}
    ></div>
  );
}

function useCharacterAnimation({
  direction = "down",
  isMoving = false,
}: CharacterAnimationProps) {
  const timingRef = useRef<NodeJS.Timeout>();
  const [moveOffset, setMoveOffset] = useState<number>(-8);
  const directionOffsetMap: Record<DirectionType, number> = {
    left: -64,
    right: -128,
    up: -196,
    down: 0,
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

  const directionOffset = directionOffsetMap[direction];

  return { moveOffset, directionOffset };
}
