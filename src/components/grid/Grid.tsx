import { Cell, CoordinateType } from "@/app/type";
import { House1, house1Info } from "../houses/House1";
import { House2, house2Info } from "../houses/House2";
import { house3Info, House3 } from "../houses/House3";
import { house4Info, House4 } from "../houses/House4";
import { house5Info, House5 } from "../houses/House5";
import { tree1Info, Tree1 } from "../houses/Tree1";

interface GridProps {
  isDevMode?: boolean;
  data: Cell[][];
  position?: CoordinateType;
  onCellClick?: (c: CoordinateType) => void;
}

const renderComp = (name: string) => {
  switch (name) {
    case house1Info.name:
      return <House1></House1>;
    case house2Info.name:
      return <House2></House2>;
    case house3Info.name:
      return <House3></House3>;
    case house4Info.name:
      return <House4></House4>;
    case house5Info.name:
      return <House5></House5>;
    case tree1Info.name:
      return <Tree1></Tree1>;
    default:
      return <></>;
  }
};

export default function Grid({
  isDevMode,
  data,
  position,
  onCellClick,
}: GridProps) {
  const style = position && {
    transform: `translate(-${position[1] * 3}rem, -${position[0] * 3}rem)`,
  };

  const wrapperClass = position
    ? "fixed top-1/2 left-1/2 transition-transformduration-1000"
    : "";

  return (
    <div className={wrapperClass}>
      <div
        className={`transition-transform ease-linear duration-100`}
        style={style}
      >
        {data.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => {
              //Pick the background color and image
              const back = !cell.occupierId ? "bg-green-100" : "bg-red-100";

              return (
                <div
                  key={x}
                  className={`bg-tile-set relative inline-block size-12 min-w-12 min-h-12 border-slate-300 ${
                    isDevMode && "border"
                  }`}
                  onClick={() => onCellClick?.([y, x])}
                  style={{
                    backgroundPosition: "-3506px -1728px",
                    backgroundSize: "6720px 7200px",
                  }}
                >
                  {cell.comp && (
                    <div
                      className={`absolute z-20 ${
                        isDevMode && "inline-block  w-auto pointer-events-none"
                      }`}
                      style={{
                        transform: `translate(-${
                          cell.comp?.anchor[1] * 3
                        }rem, -${cell.comp?.anchor[0] * 3}rem)`,
                      }}
                    >
                      {renderComp(cell.comp?.name)}
                    </div>
                  )}
                  {isDevMode && cell.occupierId && (
                    <span className="absolute z-30 bg-red-500 bg-opacity-30 h-full w-full">
                      {cell.occupierId}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
