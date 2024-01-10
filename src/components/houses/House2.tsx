import { CoordinateType } from "@/app/type";

export const name = "house2";
const anchor: CoordinateType = [2, 2];
const footprint = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
];

export const house2Info = { name, anchor, footprint };

export const House2 = () => {
  return (
    <div
      className="bg-tile-set w-48 h-60 bg-clip-content pl-1"
      style={{
        backgroundPosition: "-1295px -2180px",
        backgroundSize: "4480px 4800px",
      }}
    ></div>
  );
};
