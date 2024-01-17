import { CoordinateType } from "@/app/town/type";

export const name = "house1";
const anchor: CoordinateType = [2, 2];
const footprint = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
];

export const house1Info = { name, anchor, footprint };

export const House1Img = ({ className = "px-2" }: { className?: string }) => (
  <div
    className={`bg-tile-set bg-clip-content w-60 h-60 pointer-events-none ${className}`}
    style={{
      backgroundPosition: "-1081px -2175px",
      backgroundSize: "4480px 4800px",
    }}
  ></div>
);

export const House1 = () => {
  return (
    <>
      <div
        className="absolute z-40 w-60 h-40 pointer-events-none overflow-hidden"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
        }}
      >
        <House1Img className="px-12" />
      </div>
      <div
        className="absolute z-20 w-60 h-60 pointer-events-none"
        style={{
          transform: `translate(-${anchor[1] * 3}rem, -${anchor[0] * 3}rem)`,
        }}
      >
        <House1Img />
      </div>
    </>
  );
};
