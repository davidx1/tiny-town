import { DirectionType } from "@/app/type";

export enum Cell {
  RED,
  GREEN,
}

interface GridProps {
  data: Cell[][];
  position: [number, number];
}

export default function Grid({ data, position }: GridProps) {
  const style = {
    transform: `translate(-${position[1] * 6}rem, -${position[0] * 6}rem)`,
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transition-transform
      duration-1000 
    `}
    >
      <div
        className={`transition-transform ease-linear duration-100`}
        style={style}
      >
        {data.map((row, index) => (
          <div key={index} className="flex">
            {row.map((cell, j) => {
              //Pick the background color and image
              const colorClass =
                cell === Cell.RED
                  ? "bg-red-100"
                  : cell === Cell.GREEN
                    ? "bg-green-100"
                    : "bg-green-100";

              return <div key={j} className={`size-24 ${colorClass} `} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
