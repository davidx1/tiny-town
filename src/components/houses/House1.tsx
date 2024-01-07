import { CoordinateType } from "@/app/type";

export const House1Anchor: CoordinateType = [2, 1];
export const House1Footprint = [
  [0, 0, 0, 1],
  [0, 0, 0, 1],
  [0, 0, 0, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 1],
];

export const House1 = () => {
  return (
    <div
      className="bg-tile-set w-48 h-72"
      style={{
        backgroundPosition: "-1120px -2180px",
        backgroundSize: "4480px 4800px",
      }}
    ></div>
  );
};
