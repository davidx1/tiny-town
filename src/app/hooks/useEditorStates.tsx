import { useState } from "react";
import { Cell, CoordinateType, FeatureType } from "../type";
import uid from "tiny-uid";

export const useEditorStates = (initialMapData?: Cell[][]) => {
  const [mapData, setMapData] = useState<Cell[][]>(initialMapData || []);
  const [featureToAdd, setFeatureToAdd] = useState<FeatureType>();
  const [viewMode, setViewMode] = useState<"map" | "code">("map");
  const [editorMode, setEditorMode] = useState<"tile" | "occupied">();
  const [action, setAction] = useState<"none" | "add" | "move" | "delete">(
    "none",
  );

  const initMap = (width: number, height: number) => {
    const initMap: Cell[][] = Array.from({ length: height }, () =>
      Array.from(
        { length: width },
        () =>
          ({
            occupierId: null,
            groundType: "grass",
            comp: null,
          }) as Cell,
      ),
    ).map((row, y) =>
      row.map((cell, x) => {
        if (y < 5 || y > height - 6 || x < 5 || x > width - 6) {
          const newId = uid();
          return {
            occupierId: newId,
            groundType: "grass",
            comp: {
              name: "tree1",
              anchor: [1, 0],
            },
          } as Cell;
        }
        return cell;
      }),
    );

    setMapData(initMap);
  };

  const deleteFeature = ({ cell }: { cell: CoordinateType }) => {
    if (action === "delete" && mapData) {
      const idToDelete = mapData[cell[0]][cell[1]].occupierId;
      if (idToDelete) {
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
      for (let i = 0; i < footprint.length - 1; i++) {
        for (let j = 0; j < footprint[0].length - 1; j++) {
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
            console.log("row", i, "col", j);
            return {
              occupierId:
                footprint[i - (cell[0] - anchor[0])][
                  j - (cell[1] - anchor[1])
                ] === 1
                  ? newOccupierId
                  : mapData[i][j].occupierId,
              groundType: "grass",
              comp:
                i === cell[0] && j === cell[1]
                  ? {
                      name: featureToAdd.name,
                      anchor: featureToAdd.anchor,
                    }
                  : mapData[i][j].comp,
            };
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
