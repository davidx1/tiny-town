import { CoordinateType } from "@/app/type";

export const name = "house5";
const anchor: CoordinateType = [2, 2];
const footprint = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
];

export const house5Info = { name, anchor, footprint };

export const House5 = () => {
  return (
    <div
      className="bg-tile-set w-56 h-60 bg-clip-content pl-2 pointer-events-none"
      style={{
        backgroundPosition: "-1690px -2470px",
        backgroundSize: "4480px 4800px",
      }}
    ></div>
  );
};
