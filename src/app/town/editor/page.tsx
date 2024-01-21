"use client";

import { mapData } from "@/app/town/map";
import Editor from "@/components/editor/Editor";

export default function NewPage() {
  return <Editor initialMapData={mapData} />;
}
