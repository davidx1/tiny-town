import { useState } from "react";
import { Cell, CoordinateType, FeatureType } from "../type";
import uid from "tiny-uid";

export const useEditorStates = (initialMapData?: Cell[][]) => {
  const [mapData, setMapData] = useState<Cell[][]>(initialMapData || []);
  const [featureToAdd, setFeatureToAdd] = useState<FeatureType>();
  const [viewMode, setViewMode] = useState<"map" | "code">("map");
  const [editorMode, setEditorMode] = useState<"tile" | "occupied">();
  const [action, setAction] = useState<
    "none" | "add" | "move" | "delete" | "trigger"
  >("none");

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

  const deleteFeature = ({ cellClicked }: { cellClicked: CoordinateType }) => {
    if (action === "delete" && mapData) {
      const idToDelete = mapData[cellClicked[0]][cellClicked[1]].occupierId;
      if (idToDelete) {
        const newMapData = mapData.map((row) =>
          row.map((col) =>
            col.occupierId === idToDelete
              ? {
                  occupierId: null,
                  triggerId: null,
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
    cellClicked,
  }: {
    featureToAdd: FeatureType;
    cellClicked: CoordinateType;
  }) => {
    if (
      action === "add" &&
      mapData &&
      featureToAdd.anchor[0] <= cellClicked[0] &&
      featureToAdd.anchor[1] <= cellClicked[1]
    ) {
      const { footprint, anchor } = featureToAdd;
      for (let i = 0; i < footprint.length - 1; i++) {
        for (let j = 0; j < footprint[0].length - 1; j++) {
          const row = i + cellClicked[0] - anchor[0];
          const col = j + cellClicked[1] - anchor[1];
          if (footprint[i][j] && mapData[row][col].occupierId) {
            return;
          }
        }
      }

      const newOccupierId = uid();

      const newMapData: Cell[][] = mapData.map((row, i) => {
        return row.map((col, j) => {
          if (
            i >= cellClicked[0] - anchor[0] &&
            i < cellClicked[0] - anchor[0] + footprint.length &&
            j >= cellClicked[1] - anchor[1] &&
            j < cellClicked[1] - anchor[1] + footprint[0].length
          ) {
            return {
              occupierId:
                footprint[i - (cellClicked[0] - anchor[0])][
                  j - (cellClicked[1] - anchor[1])
                ] === 1
                  ? newOccupierId
                  : mapData[i][j].occupierId,
              triggerId: mapData[i][j].triggerId,
              groundType: "grass",
              comp:
                i === cellClicked[0] && j === cellClicked[1]
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

  const toggleTrigger = ({ cellClicked }: { cellClicked: CoordinateType }) => {
    // If the player can't enter the cell, then it can't be triggered action can happen
    if (
      action === "trigger" &&
      !mapData[cellClicked[0]][cellClicked[1]].occupierId
    ) {
      const newMap = mapData.map((row, i) => {
        return row.map((col, j) => {
          if (i === cellClicked[0] && j === cellClicked[1] && col.triggerId) {
            return {
              ...mapData[i][j],
              triggerId: null,
            };
          }

          if (i === cellClicked[0] && j === cellClicked[1] && !col.triggerId) {
            return {
              ...mapData[i][j],
              triggerId: uid(),
            };
          }

          return {
            ...mapData[i][j],
          };
        });
      });
      setMapData(newMap);
    }

    return;
  };

  const onFeatureSelection = (input: FeatureType) => {
    setAction("add");
    setFeatureToAdd(input);
  };

  const onDeleteSelection = () => {
    setAction("delete");
  };

  const onTriggerSelection = () => {
    setAction("trigger");
  };

  const onCellClick = (cellClicked: CoordinateType) => {
    if (action === "add" && mapData && featureToAdd && cellClicked) {
      addNewFeature({ featureToAdd, cellClicked });
    }
    if (action === "delete" && mapData) {
      deleteFeature({ cellClicked });
    }
    if (action === "trigger" && mapData) {
      toggleTrigger({ cellClicked });
    }
  };
  return {
    mapData,
    onFeatureSelection,
    onDeleteSelection,
    onTriggerSelection,
    onCellClick,
    viewMode,
    setViewMode,
    editorMode,
    setEditorMode,
    initMap,
    action,
  };
};
