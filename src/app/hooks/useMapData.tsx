import { mapData as permenentTownMap } from "../town/map";
import { mapData as permenentOpeningMap } from "../opening/map";
import { mapData as permenentForestMap } from "../forest/map";

import { Cell } from "../type.d";
import { useEffect, useState } from "react";

export type mapKeys = "town" | "opening" | "forest";

const permenentMaps = {
  town: permenentTownMap,
  opening: permenentOpeningMap,
  forest: permenentForestMap,
};

export const useMapData = (key: mapKeys) => {
  const permenentMap = permenentMaps[key];
  const [mapData, setMapData] = useState<Cell[][]>(permenentMap);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
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
