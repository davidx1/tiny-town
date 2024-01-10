import { CoordinateType } from "@/app/type";

export const name = "house3";
const anchor: CoordinateType = [2, 2];
const footprint = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
];

export const house3Info = { name, anchor, footprint };

export const House3 = () => {
  return (
    <div
      className="bg-tile-set w-60 h-60 bg-clip-content px-2"
      style={{
        backgroundPosition: "-1466px -2180px",
        backgroundSize: "4480px 4800px",
      }}
    ></div>
  );
};
