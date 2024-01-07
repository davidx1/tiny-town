"use client";

import Grid from "@/components/grid/Grid";
import { mapData as rawMapData } from "./map";
import { useState } from "react";
import { Cell, CoordinateType } from "../type";
import {
  House1,
  House1Anchor,
  House1Footprint,
} from "@/components/houses/House1";
import { features } from "process";

interface FeatureType {
  anchor: CoordinateType;
  footprint: number[][];
  comp: React.ReactNode;
}

export default function Home() {
  const [mapData, setMapData] = useState(rawMapData);
  const [featureSelected, setFeatureSelected] = useState<FeatureType>();

  const onFeatureSelection = (input: FeatureType) => {
    setFeatureSelected(input);
  };

  const onCellClick = (input: CoordinateType) => {
    if (
      featureSelected &&
      featureSelected.anchor[0] <= input[0] &&
      featureSelected.anchor[1] <= input[1]
    ) {
      const { footprint, anchor } = featureSelected;
      for (let i = 0; i < footprint.length; i++) {
        for (let j = 0; j < footprint[0].length; j++) {
          const row = i + input[0] - anchor[0];
          const col = j + input[1] - anchor[1];
          if (!mapData[row][col].isFree) {
            return;
          }
        }
      }

      const newMapData: Cell[][] = mapData.map((row, i) => {
        return row.map((col, j) => {
          if (
            i >= input[0] - anchor[0] &&
            i < input[0] - anchor[0] + footprint.length &&
            j >= input[1] - anchor[1] &&
            j < input[1] - anchor[1] + footprint[0].length
          ) {
            {
              return {
                isFree:
                  !!footprint[i - (input[0] - anchor[0])][
                    j - (input[1] - anchor[1])
                  ],
                groundType: "grass",
                occupiedComp:
                  i === input[0] && j === input[1]
                    ? {
                        comp: featureSelected.comp,
                        anchor: anchor,
                      }
                    : null,
              };
            }
          }
          return col;
        });
      });

      setMapData(newMapData);
    }
  };

  return (
    <div
      className=" relative w-full min-h-screen bg-slate-700 flex-column items-center justify-center"
      tabIndex={-1}
    >
      <div>
        <button
          onClick={() =>
            onFeatureSelection({
              anchor: House1Anchor,
              footprint: House1Footprint,
              comp: <House1 />,
            })
          }
        >
          <House1 />
        </button>
      </div>
      <Grid data={mapData} onCellClick={onCellClick}></Grid>
      <div>{JSON.stringify(mapData, null, 2)}</div>
    </div>
  );
}
