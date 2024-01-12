import { CoordinateType } from "@/app/type";

export const name = "tree1";
const anchor: CoordinateType = [1, 0];
const footprint = [[0], [1]];

export const tree1Info = { name, anchor, footprint };

export const Tree1 = () => {
  return (
    <div
      className="bg-tile-set w-24 h-24 bg-clip-content pointer-events-none z-20"
      style={{
        backgroundPosition: "-32px -0px",
        backgroundSize: "4480px 4800px",
        transform: "translateX(-24px)",
      }}
    ></div>
  );
};
