import { mapData as permenentTownMap } from "../town/map";
import { mapData as permenentOpeningMap } from "../opening/map";
import { Cell } from "../type";
import { useEffect, useState } from "react";

export type mapKeys = "town" | "opening";

const permenentMaps = {
  town: permenentTownMap,
  opening: permenentOpeningMap,
};

export const useMapData = (key: mapKeys) => {
  const [mapData, setMapData] = useState<Cell[][]>([[]]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const permenentMap = permenentMaps[key];
    const storedMapString = window.sessionStorage.getItem(`${key}-session-map`);
    setMapData(
      storedMapString
        ? (JSON.parse(storedMapString) as Cell[][])
        : permenentMap,
    );
    setIsLoading(false);
  }, [key]);

  const saveMapData = (newMap: Cell[][]) => {
    const newMapString = JSON.stringify(newMap);
    window.sessionStorage.setItem(`${key}-session-map`, newMapString);
  };

  return { mapData, saveMapData, isLoading };
};
