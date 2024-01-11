import { CoordinateType } from "@/app/type";

export const name = "house4";
const anchor: CoordinateType = [2, 2];
const footprint = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
];

export const house4Info = { name, anchor, footprint };

export const House4 = () => {
  return (
    <div
      className="bg-tile-set w-48 h-60 bg-clip-content px-4 pointer-events-none"
      style={{
        backgroundPosition: "-1680px -2180px",
        backgroundSize: "4480px 4800px",
      }}
    ></div>
  );
};
