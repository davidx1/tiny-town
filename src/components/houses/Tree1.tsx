import { CoordinateType } from "@/app/type";

export const name = "tree1";
const anchor: CoordinateType = [1, 0];
const footprint = [[0], [1]];

export const tree1Info = { name, anchor, footprint };

export const Tree1 = () => {
  return (
    <div
      className="absolute bg-tile-set w-24 h-24 bg-clip-content pointer-events-none z-40"
      style={{
        transform: `translate(-1.5rem, -2.5rem)`,
        backgroundPosition: "-32px -0px",
        backgroundSize: "4480px 4800px",
        // transform: "translateX(-24px)",
      }}
    ></div>
  );
};
