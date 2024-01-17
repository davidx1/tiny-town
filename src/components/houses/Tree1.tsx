import { CoordinateType } from "@/app/town/type";

export const name = "tree1";
const anchor: CoordinateType = [1, 0];
const footprint = [[0], [1]];

export const tree1Info = { name, anchor, footprint };

export const Tree1Img = () => (
  <div
    className="bg-tile-set w-24 h-24 bg-clip-content pointer-events-none"
    style={{
      backgroundPosition: "-32px -0px",
      backgroundSize: "4480px 4800px",
    }}
  />
);

export const Tree1 = () => {
  return (
    <div
      className="absolute w-24 h-24 pointer-events-none z-40"
      style={{
        transform: `translate(-1.5rem, -2.5rem)`,
      }}
    >
      <Tree1Img />
    </div>
  );
};
