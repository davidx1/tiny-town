"use client";

import { useMapData } from "@/hooks/useMapData";
import Editor from "@/components/editor/Editor";

export default function NewPage() {
  const { mapData, saveMapData, isLoading } = useMapData("opening");
  return (
    !isLoading && <Editor initialMapData={mapData} saveMapData={saveMapData} />
  );
}
