import { CoordinateType } from "@/type.d";

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

export const House5Img = ({ className = "px-3" }: { className?: string }) => (
  <div
    className={`bg-tile-set bg-clip-content w-60 h-60 pointer-events-none  ${className}`}
    style={{
      backgroundPosition: "-1690px -2470px",
      backgroundSize: "4480px 4800px",
    }}
  ></div>
);

export const House5 = () => {
  return (
    <>
      <div
        className="absolute z-40 w-56 h-36 pointer-events-none overflow-hidden"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
        }}
      >
        <House5Img className="px-8" />
      </div>
      <div
        className="absolute z-20 w-60 h-60 pointer-events-none overflow-hidden"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
        }}
      >
        <House5Img className="px-3" />
      </div>
    </>
  );
};
