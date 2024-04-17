import { Cell, CoordinateType } from "@/type.d";
import { memo } from "react";
import { house1Info, House1 } from "./Placeables/House1";
import { house2Info, House2 } from "./Placeables/House2";
import { house3Info, House3 } from "./Placeables/House3";
import { house4Info, House4 } from "./Placeables/House4";
import { house5Info, House5 } from "./Placeables/House5";
import { tree1Info, Tree1 } from "./Placeables/Tree1";
import Character from "./Character";
import {
  characterBlondHair,
  characterSilverHair,
  characterSpikyHair,
  characterWhiteShirt,
  characterYellowHat,
} from "./Placeables/Characters";

export interface GridDataProps {
  data: Cell[][];
  onCellClick?: (c: CoordinateType) => void;
  isDevMode?: boolean;
}

export const GridData = memo(function GridData({
  data,
  onCellClick,
  isDevMode,
}: GridDataProps) {
  return (
    <>
      {data.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => {
            return (
              <div
                key={x}
                className={`size-12 min-w-12 min-h-12`}
                onClick={() => onCellClick?.([y, x])}
              >
                <div
                  key={x}
                  className={`absolute bg-tile-set size-12 min-w-12 min-h-12 z-10`}
                  style={{
                    backgroundPosition: "-3504px -1728px",
                    backgroundSize: "6720px 7200px",
                    backgroundColor: "#97d883",
                  }}
                />

                {cell.comp && renderComp(cell.comp?.name)}
                {isDevMode && cell.occupierId && (
                  <span className="absolute z-50 border bg-red-500 bg-opacity-40 block h-12 w-12 text-xs">
                    {cell.occupierId}
                  </span>
                )}
                {isDevMode && cell.triggerId && (
                  <span className="absolute z-50 border bg-blue-500 bg-opacity-40 block h-12 w-12 text-xs">
                    {cell.triggerId}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
});

const renderComp = (name: string) => {
  switch (name) {
    case house1Info.name:
      return <House1></House1>;
    case house2Info.name:
      return <House2></House2>;
    case house3Info.name:
      return <House3></House3>;
    case house4Info.name:
      return <House4></House4>;
    case house5Info.name:
      return <House5></House5>;
    case tree1Info.name:
      return <Tree1></Tree1>;
    case characterBlondHair.name:
      return (
        <div className="absolute z-20">
          <Character characterBgClass={"bg-blond-hair-sprite"} />
        </div>
      );
    case characterSilverHair.name:
      return (
        <div className="absolute z-20">
          <Character characterBgClass={"bg-silver-hair-sprite"} />
        </div>
      );
    case characterSpikyHair.name:
      return (
        <div className="absolute z-20">
          <Character characterBgClass={"bg-spiky-hair-sprite"} />
        </div>
      );
    case characterWhiteShirt.name:
      return (
        <div className="absolute z-20">
          <Character characterBgClass={"bg-white-shirt-sprite"} />
        </div>
      );
    case characterYellowHat.name:
      return (
        <div className="absolute z-20">
          <Character characterBgClass={"bg-yellow-hat-sprite"} />
        </div>
      );
    default:
      return <></>;
  }
};
