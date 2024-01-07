import { DirectionType } from "@/app/type";

interface PlayerProps {
  direction: DirectionType;
  isMoving?: boolean;
}

export default function Player({ direction }: PlayerProps) {
  const directionIconMap = {
    left: "👈",
    right: "👉",
    up: "👆",
    down: "👇",
  };
  return (
    <div className="size-12 flex items-center justify-center fixed top-1/2 left-1/2">
      {directionIconMap[direction]}
    </div>
  );
}
