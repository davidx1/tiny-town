import { Cell, CoordinateType } from "@/app/type";

interface GridProps {
  data: Cell[][];
  position?: CoordinateType;
  onCellClick?: (c: CoordinateType) => void;
}

export default function Grid({ data, position, onCellClick }: GridProps) {
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
              const colorClass = cell.isFree ? "bg-green-100" : "bg-red-100";

              return (
                <div
                  key={x}
                  className={`size-12 ${colorClass} border-slate-300 border`}
                  onClick={() => onCellClick?.([y, x])}
                >
                  {cell.occupiedComp && (
                    <div
                      className="relative"
                      style={{
                        transform: `translate(-${
                          cell.occupiedComp?.anchor[1] * 3
                        }rem, -${cell.occupiedComp?.anchor[0] * 3}rem)`,
                      }}
                    >
                      {cell.occupiedComp?.comp}
                    </div>
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
