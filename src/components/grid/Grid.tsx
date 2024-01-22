import { Cell, CoordinateType } from "@/app/type";
import { GridData } from "./GridData";

interface GridProps {
  isDevMode?: boolean;
  data: Cell[][];
  position?: CoordinateType;
  onCellClick?: (c: CoordinateType) => void;
}

export default function Grid({
  isDevMode,
  data,
  position,
  onCellClick,
}: GridProps) {
  const style = position && {
    transitionProperty: "left, top",
    transitionDuration: "0.1s",
    transitionTimingFunction: "linear",
    top: `-${position[0] * 3}rem`,
    left: `-${position[1] * 3}rem`,
  };

  return (
    <div className="absolute ease-linear" style={style}>
      <GridData data={data} onCellClick={onCellClick} isDevMode={isDevMode} />
    </div>
  );
}
