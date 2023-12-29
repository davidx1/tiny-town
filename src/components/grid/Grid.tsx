export enum Cell {
  RED,
  GREEN,
}

interface GridProps {
  data: Cell[][];
}

export default function Grid({ data }: GridProps) {
  return (
    <div className="bg-slate-100 border-4 border-black">
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

            return (
              <div
                key={j}
                className={`w-24 h-24 border-2 border-black ${colorClass}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
