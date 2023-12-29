import Grid, { Cell } from "@/components/grid/Grid";
import Player from "@/components/player/Player";
import { mapData } from "./map";

export default function Home() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="relative">
        <Grid data={mapData}></Grid>
        <Player />
      </div>
    </div>
  );
}
