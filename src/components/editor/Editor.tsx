"use client";

import Grid from "@/components/grid/Grid";
import JSONPretty from "react-json-pretty";
import { useRef } from "react";
import { House1Img, house1Info } from "@/components/Placeables/House1";
import { House2Img, house2Info } from "@/components/Placeables/House2";
import { House3Img, house3Info } from "@/components/Placeables/House3";
import { House4Img, house4Info } from "@/components/Placeables/House4";
import { House5Img, house5Info } from "@/components/Placeables/House5";
import { tree1Info, Tree1, Tree1Img } from "@/components/Placeables/Tree1";
import { useEditorStates } from "./useEditorStates";
import { Cell } from "@/type.d";
import Character from "../character/Character";
import {
  characterBlondHair,
  characterSilverHair,
  characterSpikyHair,
  characterWhiteShirt,
  characterYellowHat,
} from "../Placeables/Characters";

interface EditorProps {
  initialMapData?: Cell[][];
  saveMapData: (mapData: Cell[][]) => void;
}

export default function Editor({ initialMapData, saveMapData }: EditorProps) {
  const {
    mapData,
    onFeatureSelection,
    onDeleteSelection,
    onTriggerSelection,
    onCellClick,
    viewMode,
    setViewMode,
    initMap,
  } = useEditorStates(initialMapData);

  const wInputRef = useRef<HTMLInputElement>(null);
  const hInputRef = useRef<HTMLInputElement>(null);
  const forestThicknessRef = useRef<HTMLInputElement>(null);

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const cols = wInputRef.current?.value;
    const rows = hInputRef.current?.value;
    const forestThickness = forestThicknessRef.current?.value;

    if (cols && rows) {
      initMap(Number(cols), Number(rows), Number(forestThickness));
    }
  };

  const handleSave = () => {
    if (mapData) {
      saveMapData(mapData);
    }
  };

  return (
    <div className="flex overflow-hidden w-full h-screen" tabIndex={-1}>
      <div className="overflow-scroll w-1/6 flex flex-col border-r-2 pt-20 pb-6 bg-slate-400 justify-between ">
        <div className="flex flex-col items-center">
          <button onClick={() => onFeatureSelection(house1Info)}>
            <House1Img />
          </button>
          <button onClick={() => onFeatureSelection(house2Info)}>
            <House2Img />
          </button>
          <button onClick={() => onFeatureSelection(house3Info)}>
            <House3Img />
          </button>
          <button onClick={() => onFeatureSelection(house4Info)}>
            <House4Img />
          </button>
          <button onClick={() => onFeatureSelection(house5Info)}>
            <House5Img />
          </button>
          <button onClick={() => onFeatureSelection(tree1Info)}>
            <Tree1Img />
          </button>
          <button onClick={() => onFeatureSelection(characterBlondHair)}>
            <Character characterBgClass={"bg-blond-hair-sprite"} />
          </button>
          <button onClick={() => onFeatureSelection(characterSilverHair)}>
            <Character characterBgClass={"bg-silver-hair-sprite"} />
          </button>
          <button onClick={() => onFeatureSelection(characterSpikyHair)}>
            <Character characterBgClass={"bg-spiky-hair-sprite"} />
          </button>
          <button onClick={() => onFeatureSelection(characterWhiteShirt)}>
            <Character characterBgClass={"bg-white-shirt-sprite"} />
          </button>
          <button onClick={() => onFeatureSelection(characterYellowHat)}>
            <Character characterBgClass={"bg-yellow-hat-sprite"} />
          </button>
        </div>
        {!mapData && (
          <div className="absolute top-0 bottom-0 left-0 w-1/6 bg-slate-400 opacity-80"></div>
        )}
      </div>
      <div className="w-5/6 h-screen flex flex-col p-8 pt-20 flex-1 gap-2 bg-slate-400 ">
        {!mapData ? (
          <div className="w-36 m-auto">
            <form
              className="flex flex-col gap-2"
              onSubmit={handleFormSubmission}
            >
              <label htmlFor="width-input">Width:</label>
              <input id="width-input" type="number" ref={wInputRef} />

              <label htmlFor="height-input">Height:</label>
              <input id="height-input" type="number" ref={hInputRef} />
              <label htmlFor="forest-input">Forest Thickness</label>
              <input id="forest-input" type="number" ref={forestThicknessRef} />
              <button className="px-2 p-2 bg-white" type="submit">
                Submit
              </button>
            </form>
          </div>
        ) : viewMode === "map" ? (
          <div className="flex flex-col gap-6 h-full w-full">
            <div className="flex bg-white items-center justify-center gap-6 p-4">
              <button onClick={() => setViewMode("code")}>Code View</button>
              <button onClick={handleSave}>Save</button>
              <button onClick={onDeleteSelection}>Delete</button>
              <button onClick={onTriggerSelection}>Trigger</button>
            </div>
            <div className="flex-1 overflow-scroll relative p-24">
              <Grid isDevMode data={mapData} onCellClick={onCellClick}></Grid>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 h-full w-full">
            <div className="flex bg-white items-center justify-center gap-6 p-4">
              <button onClick={() => setViewMode("map")}>Map View</button>
              <button onClick={handleSave}>Save</button>
              <button onClick={onDeleteSelection}>Delete</button>
              <button onClick={onTriggerSelection}>Trigger</button>
            </div>
            <div className="p-2 bg-gray-50  overflow-scroll">
              <JSONPretty data={mapData}></JSONPretty>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
