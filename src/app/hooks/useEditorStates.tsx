import { useState } from "react";
import { Cell, CoordinateType, FeatureType } from "../type";
import uid from "tiny-uid";

export const useEditorStates = () => {
  const [mapData, setMapData] = useState<Cell[][]>();
  const [featureToAdd, setFeatureToAdd] = useState<FeatureType>();
  const [viewMode, setViewMode] = useState<"map" | "code">("map");
  const [editorMode, setEditorMode] = useState<"tile" | "occupied">();
  const [action, setAction] = useState<"none" | "add" | "move" | "delete">(
    "none",
  );

  const initMap = (width: number, height: number) => {
    console.log("initMape");
    const initMap: Cell[][] = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ({
        occupierId: null,
        groundType: "grass",
        comp: null,
      })),
    );
    setMapData(initMap);
  };

  const deleteFeature = ({ cell }: { cell: CoordinateType }) => {
    if (action === "delete" && mapData) {
      const idToDelete = mapData[cell[0]][cell[1]].occupierId;
      const newMapData = mapData.map((row) =>
        row.map((col) =>
          col.occupierId === idToDelete
            ? {
                occupierId: null,
                groundType: col.groundType,
                comp: null,
              }
            : col,
        ),
      );
      setMapData(newMapData);
    }
  };

  const addNewFeature = ({
    featureToAdd,
    cell,
  }: {
    featureToAdd: FeatureType;
    cell: CoordinateType;
  }) => {
    if (
      action === "add" &&
      mapData &&
      featureToAdd.anchor[0] <= cell[0] &&
      featureToAdd.anchor[1] <= cell[1]
    ) {
      const { footprint, anchor } = featureToAdd;
      for (let i = 0; i < footprint.length; i++) {
        for (let j = 0; j < footprint[0].length; j++) {
          const row = i + cell[0] - anchor[0];
          const col = j + cell[1] - anchor[1];
          if (footprint[i][j] && mapData[row][col].occupierId) {
            console.log("overlap with others");
            return;
          }
        }
      }

      const newOccupierId = uid(5);

      const newMapData: Cell[][] = mapData.map((row, i) => {
        return row.map((col, j) => {
          if (
            i >= cell[0] - anchor[0] &&
            i < cell[0] - anchor[0] + footprint.length &&
            j >= cell[1] - anchor[1] &&
            j < cell[1] - anchor[1] + footprint[0].length
          ) {
            {
              return {
                occupierId: !!footprint[i - (cell[0] - anchor[0])][
                  j - (cell[1] - anchor[1])
                ]
                  ? newOccupierId
                  : mapData[i][j].occupierId,
                groundType: "grass",
                comp:
                  i === cell[0] && j === cell[1]
                    ? {
                        name: featureToAdd.name,
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

  const onFeatureSelection = (input: FeatureType) => {
    setAction("add");
    setFeatureToAdd(input);
  };

  const onDeleteSelection = () => {
    setAction("delete");
  };

  const onCellClick = (cellClicked: CoordinateType) => {
    if (action === "add" && mapData && featureToAdd && cellClicked) {
      addNewFeature({ featureToAdd, cell: cellClicked });
    }
    if (action === "delete" && mapData) {
      deleteFeature({ cell: cellClicked });
    }
  };
  return {
    mapData,
    onFeatureSelection,
    onDeleteSelection,
    onCellClick,
    viewMode,
    setViewMode,
    editorMode,
    setEditorMode,
    initMap,
    action,
  };
};
