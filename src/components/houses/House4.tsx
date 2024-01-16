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

export const House4Img = ({ className = "px-3.5" }: { className?: string }) => (
  <div
    className={`bg-tile-set bg-clip-content w-48 h-60 pointer-events-none ${className}`}
    style={{
      backgroundPosition: "-1674px -2173px",
      backgroundSize: "4480px 4800px",
    }}
  ></div>
);

export const House4 = () => {
  return (
    <>
      <div
        className="absolute z-40 w-48 h-40 pointer-events-none overflow-hidden"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
        }}
      >
        <House4Img className="px-8" />
      </div>
      <div
        className="absolute z-20 w-48 h-60 pointer-events-none overflow-hidden"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
        }}
      >
        <House4Img className="px-3.5" />
      </div>
    </>
  );
};
