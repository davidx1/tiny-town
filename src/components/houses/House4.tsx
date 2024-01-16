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
    <>
      <div
        className="absolute z-40 bg-tile-set w-48 h-40 bg-clip-content px-8 pointer-events-none"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
          backgroundPosition: "-1674px -2173px",
          backgroundSize: "4480px 4800px",
        }}
      ></div>
      <div
        className="absolute z-20 bg-tile-set w-48 h-60 bg-clip-content px-4 pointer-events-none"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
          backgroundPosition: "-1674px -2173px",
          backgroundSize: "4480px 4800px",
        }}
      ></div>
    </>
  );
};
