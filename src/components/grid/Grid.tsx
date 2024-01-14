import { Cell, CoordinateType } from "@/app/type";
import { House1, house1Info } from "../houses/House1";
import { House2, house2Info } from "../houses/House2";
import { house3Info, House3 } from "../houses/House3";
import { house4Info, House4 } from "../houses/House4";
import { house5Info, House5 } from "../houses/House5";
import { tree1Info, Tree1 } from "../houses/Tree1";
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
