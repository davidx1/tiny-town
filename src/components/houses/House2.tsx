import { CoordinateType } from "@/app/type.d";

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

export const House2Img = ({ className = "px-2" }: { className?: string }) => (
  <div
    className={`bg-tile-set bg-clip-content w-48 h-60 pointer-events-none border border-dashed ${className}`}
    style={{
      backgroundPosition: "-1290px -2173px",
      backgroundSize: "4480px 4800px",
    }}
  ></div>
);
export const House2 = () => {
  return (
    <>
      <div
        className="absolute z-40 w-48 h-40 pointer-events-none overflow-hidden"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
        }}
      >
        <House2Img className="px-8" />
      </div>
      <div
        className="absolute z-20 w-48 h-60 pointer-events-none"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
        }}
      >
        <House2Img className="pl-4" />
      </div>
    </>
  );
};
