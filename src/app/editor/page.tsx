"use client";

import Grid from "@/components/grid/Grid";
import JSONPretty from "react-json-pretty";
import { useEditorStates } from "../hooks/useEditorStates";
import { useEffect, useRef } from "react";
import { House1, house1Info } from "@/components/houses/House1";
import { House2, house2Info } from "@/components/houses/House2";
import { House3, house3Info } from "@/components/houses/House3";
import { House4, house4Info } from "@/components/houses/House4";
import { House5, house5Info } from "@/components/houses/House5";
import { tree1Info, Tree1 } from "@/components/houses/Tree1";
import { mapData as initialMapData } from "../map";

export default function Home() {
  const {
    mapData,
    onFeatureSelection,
    onDeleteSelection,
    onCellClick,
    viewMode,
    setViewMode,
    editorMode,
    setEditorMode,
    initMap,
  } = useEditorStates(initialMapData);

  const wInputRef = useRef<HTMLInputElement>(null);
  const hInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const cols = wInputRef.current?.value;
    const rows = hInputRef.current?.value;
    console.log(`Received request to initiate a ${cols} by ${rows} map`);

    if (cols && rows) {
      initMap(Number(cols), Number(rows));
    }
  };

  async function handleSaveObjectAsJson() {
    //TODO: to complete
  }

  return (
    <div className="flex overflow-hidden w-full h-screen" tabIndex={-1}>
      <div className="overflow-scroll w-1/6 flex flex-col border-r-2 pt-20 pb-6 bg-slate-400 justify-between ">
        <div className="flex flex-col items-center">
          <button onClick={() => onFeatureSelection(house1Info)}>
            <House1 />
          </button>
          <button onClick={() => onFeatureSelection(house2Info)}>
            <House2 />
          </button>
          <button onClick={() => onFeatureSelection(house3Info)}>
            <House3 />
          </button>
          <button onClick={() => onFeatureSelection(house4Info)}>
            <House4 />
          </button>
          <button onClick={() => onFeatureSelection(house5Info)}>
            <House5 />
          </button>
          <button onClick={() => onFeatureSelection(tree1Info)}>
            <Tree1 />
          </button>
        </div>
        <div className="p-4 text-center">
          <button className="bg-white p-2 px-4" onClick={onDeleteSelection}>
            Delete
          </button>
        </div>
        {!mapData && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-400 opacity-80"></div>
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
              <button className="px-2 p-2 bg-white" type="submit">
                Submit
              </button>
            </form>
          </div>
        ) : viewMode === "map" ? (
          <div className="flex flex-col gap-6 h-full w-full">
            <div className="flex bg-white items-center justify-center gap-6 p-4">
              <button onClick={() => setViewMode("code")}>
                Switch To Code View
              </button>
              <button onClick={handleSaveObjectAsJson}>Save</button>
            </div>
            <div className="flex-1 overflow-scroll relative p-24">
              <Grid isDevMode data={mapData} onCellClick={onCellClick}></Grid>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 h-full w-full">
            <div className="flex bg-white items-center justify-center gap-6 p-4">
              <button onClick={() => setViewMode("map")}>
                Switch To Map View
              </button>
              <button onClick={handleSaveObjectAsJson}>Save</button>
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
